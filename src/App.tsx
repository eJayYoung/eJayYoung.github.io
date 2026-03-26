import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'

// 二十四节气数据（正午太阳高度角）
const solarTerms = [
  { name: '冬至', angle: 36.5, shadowLength: 1.5 },
  { name: '小寒', angle: 38.6, shadowLength: 1.46 },
  { name: '大寒', angle: 41.9, shadowLength: 1.42 },
  { name: '立春', angle: 46.5, shadowLength: 1.36 },
  { name: '雨水', angle: 51.3, shadowLength: 1.28 },
  { name: '惊蛰', angle: 56.2, shadowLength: 1.2 },
  { name: '春分', angle: 60, shadowLength: 1.1 },
  { name: '清明', angle: 63.9, shadowLength: 0.98 },
  { name: '谷雨', angle: 68.5, shadowLength: 0.86 },
  { name: '立夏', angle: 72.9, shadowLength: 0.74 },
  { name: '小满', angle: 76.6, shadowLength: 0.62 },
  { name: '芒种', angle: 79.3, shadowLength: 0.5 },
  { name: '夏至', angle: 83.5, shadowLength: 0.4 },
  { name: '小暑', angle: 79.3, shadowLength: 0.46 },
  { name: '大暑', angle: 76.6, shadowLength: 0.54 },
  { name: '立秋', angle: 72.9, shadowLength: 0.66 },
  { name: '处暑', angle: 68.5, shadowLength: 0.78 },
  { name: '白露', angle: 63.9, shadowLength: 0.9 },
  { name: '秋分', angle: 60, shadowLength: 1.02 },
  { name: '寒露', angle: 56.2, shadowLength: 1.16 },
  { name: '霜降', angle: 51.3, shadowLength: 1.3 },
  { name: '立冬', angle: 46.5, shadowLength: 1.4 },
  { name: '小雪', angle: 41.9, shadowLength: 1.48 },
  { name: '大雪', angle: 38.6, shadowLength: 1.5 },
]

function App() {
  const [sunAngle, setSunAngle] = useState(83.5) // 初始角度（正午太阳高度角）
  const [isDragging, setIsDragging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTermIndex, setCurrentTermIndex] = useState(12) // 默认夏至（index=12）
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 播放节气循环
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentTermIndex((prev) => {
        const next = (prev + 1) % solarTerms.length
        setSunAngle(solarTerms[next].angle)
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isPlaying])

  // 画布参数
  const width = 1600
  const height = 800
  const centerX = width / 2 + 100 // 圆心更靠右
  const groundY = height - 80
  const rodHeight = 150
  const rodBottomY = groundY
  const rodBottomX = centerX
  const radius = 350 // 稍微增大半径，让太阳更高
  const minAngle = 36.5 // 正午太阳高度角最小（冬至）
  const maxAngle = 83.5 // 正午太阳高度角最大（夏至）
  const centerY = groundY - rodHeight - 50 // 圆心Y坐标

  // 杆子顶部坐标
  const rodTopX = rodBottomX
  const rodTopY = rodBottomY - rodHeight

  // 计算太阳位置（正午太阳高度角 = 90° - 太阳光线与地面夹角）
  const clampedAngle = Math.max(minAngle, Math.min(maxAngle, sunAngle))
  const angleWithGround = 90 - clampedAngle
  const sunX = rodTopX + radius * Math.cos(angleWithGround * Math.PI / 180)
  const sunY = rodTopY - radius * Math.sin(angleWithGround * Math.PI / 180)

  // 阴影长度 = 杆高 * cot(太阳光线与地面夹角)
  const shadowLength = rodHeight / Math.tan(angleWithGround * Math.PI / 180)

  // 阴影末端X坐标（阴影在杆子左边）
  const shadowEndX = rodTopX - shadowLength

  // 获取当前节气
  const getCurrentSolarTerm = () => {
    let normalizedAngle = sunAngle % 360
    if (normalizedAngle < 0) normalizedAngle += 360

    let closestIndex = 0
    let closest = solarTerms[0]
    let minDiff = Math.abs(solarTerms[0].angle - normalizedAngle)

    for (let i = 1; i < solarTerms.length; i++) {
      let diff = Math.abs(solarTerms[i].angle - normalizedAngle)
      if (normalizedAngle > 340 || normalizedAngle < 20) {
        const altDiff = Math.min(
          Math.abs(solarTerms[i].angle - normalizedAngle - 360),
          Math.abs(solarTerms[i].angle - normalizedAngle + 360)
        )
        diff = Math.min(diff, altDiff)
      }
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
        closest = solarTerms[i]
      }
    }
    return { term: closest, index: closestIndex }
  }

  const { term: currentTerm, index: currentIdx } = getCurrentSolarTerm()
  const displayedAngle = sunAngle // sunAngle 就是正午太阳高度角

  // 将鼠标/触摸坐标转换为SVG坐标
  const getSVGCoords = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }

    const CTM = svg.getScreenCTM()
    if (!CTM) return { x: 0, y: 0 }

    return {
      x: (clientX - CTM.e) / CTM.a,
      y: (clientY - CTM.f) / CTM.d
    }
  }, [])

  // 开始拖动
  const handleStart = useCallback((clientX: number, clientY: number) => {
    const coords = getSVGCoords(clientX, clientY)
    const distToSun = Math.sqrt(Math.pow(coords.x - sunX, 2) + Math.pow(coords.y - sunY, 2))

    // 扩大检测范围到80像素（SVG坐标）
    if (distToSun < 80) {
      setIsDragging(true)
    }
  }, [sunX, sunY, getSVGCoords])

  // 拖动中
  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return

    const coords = getSVGCoords(clientX, clientY)

    // 计算太阳光线与地面的夹角
    const dx = coords.x - rodTopX
    const dy = rodTopY - coords.y
    let angleWithGround = Math.atan2(dy, dx) * 180 / Math.PI

    // 限制夹角范围
    if (angleWithGround < (90 - maxAngle)) angleWithGround = 90 - maxAngle
    if (angleWithGround > (90 - minAngle)) angleWithGround = 90 - minAngle

    // 转换为正午太阳高度角 = 90 - 夹角
    const sunAltitudeAngle = 90 - angleWithGround

    // 限制太阳在地面以上
    if (coords.y < groundY - 10) {
      setSunAngle(sunAltitudeAngle)
    }
  }, [isDragging, rodTopX, rodTopY, groundY, minAngle, maxAngle, getSVGCoords])

  // 停止拖动
  const handleEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // 鼠标事件
  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }, [handleStart])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    handleMove(e.clientX, e.clientY)
  }, [handleMove])

  // 触摸事件
  const handleTouchStart = useCallback((e: React.TouchEvent<SVGSVGElement>) => {
    e.preventDefault()
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }, [handleStart])

  const handleTouchMove = useCallback((e: React.TouchEvent<SVGSVGElement>) => {
    e.preventDefault()
    const touch = e.touches[0]
    handleMove(touch.clientX, touch.clientY)
  }, [handleMove])

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalTouchEnd = () => setIsDragging(false)

    window.addEventListener('mouseup', handleGlobalMouseUp)
    window.addEventListener('touchend', handleGlobalTouchEnd)

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('touchend', handleGlobalTouchEnd)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题区域 */}
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            土圭测影 · 二十四节气
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            拖动太阳观察影长变化，探索古代天文智慧
          </p>
        </header>

        {/* 主演示区域 */}
        <div ref={containerRef} className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <svg
            ref={svgRef}
            width="100%"
            height="auto"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleEnd}
          >
            {/* 背景渐变 */}
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="60%" stopColor="#E0F4FF" />
                <stop offset="100%" stopColor="#F5F5DC" />
              </linearGradient>
              <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B7355" />
                <stop offset="100%" stopColor="#6B5344" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* 天空背景 */}
            <rect x="0" y="0" width={width} height={groundY} fill="url(#skyGradient)" />

            {/* 地面 */}
            <rect x="0" y={groundY} width={width} height={height - groundY} fill="url(#groundGradient)" />

            {/* 太阳运动轨迹（圆） */}
            <circle
              cx={rodTopX}
              cy={rodTopY}
              r={radius}
              fill="none"
              stroke="rgba(255, 200, 100, 0.3)"
              strokeWidth="2"
              strokeDasharray="8 4"
            />

            {/* 阴影 */}
            {sunY < rodTopY && (
              <>
                {/* 阴影光晕效果 */}
                <line
                  x1={rodTopX}
                  y1={groundY + 3}
                  x2={shadowEndX}
                  y2={groundY + 3}
                  stroke="#4A4A6A"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity="0.3"
                />
                {/* 阴影主体 */}
                <line
                  x1={rodTopX}
                  y1={groundY}
                  x2={shadowEndX}
                  y2={groundY}
                  stroke="#ff3232"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* 阴影边缘高亮 */}
                <line
                  x1={rodTopX}
                  y1={groundY - 2}
                  x2={shadowEndX}
                  y2={groundY - 2}
                  stroke="#ff4000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </>
            )}

            {/* 杆子 */}
            <line
              x1={rodBottomX}
              y1={rodBottomY}
              x2={rodTopX}
              y2={rodTopY}
              stroke="#4A3728"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* 杆子顶部装饰 */}
            <circle
              cx={rodTopX}
              cy={rodTopY}
              r="8"
              fill="#8B4513"
            />

            {/* 太阳光线（虚线） */}
            <line
              x1={sunX}
              y1={sunY}
              x2={rodTopX}
              y2={rodTopY}
              stroke="#FFD700"
              strokeWidth="4"
              strokeDasharray="12 6"
              strokeLinecap="round"
              filter="url(#glow)"
              opacity="0.8"
            />

            {/* 太阳光线延伸（到阴影） */}
            {sunY < rodTopY && shadowEndX !== rodTopX && (
              <line
                x1={rodTopX}
                y1={rodTopY}
                x2={shadowEndX}
                y2={groundY}
                stroke="#FFD700"
                strokeWidth="4"
                strokeDasharray="12 6"
                strokeLinecap="round"
                opacity="0.6"
              />
            )}

            {/* 可拖动区域 - 大圆形透明区域 */}
            <circle
              cx={sunX}
              cy={sunY}
              r="70"
              fill="transparent"
              stroke="transparent"
              style={{ cursor: 'grab' }}
            />

            {/* 太阳 */}
            <g
              filter="url(#glow)"
              style={{ cursor: 'grab' }}
            >
              {/* 外圈光晕 */}
              <circle
                cx={sunX}
                cy={sunY}
                r="55"
                fill="rgba(255, 215, 0, 0.2)"
              />
              <circle
                cx={sunX}
                cy={sunY}
                r="45"
                fill="#FFD700"
              />
              <circle
                cx={sunX}
                cy={sunY}
                r="35"
                fill="#FFF5CC"
              />
              {/* 太阳光芒 */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1={sunX + 50 * Math.cos(angle * Math.PI / 180)}
                  y1={sunY + 50 * Math.sin(angle * Math.PI / 180)}
                  x2={sunX + 65 * Math.cos(angle * Math.PI / 180)}
                  y2={sunY + 65 * Math.sin(angle * Math.PI / 180)}
                  stroke="#FFD700"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* 角度指示弧线 */}
            <path
              d={`M ${rodTopX + 30} ${rodTopY} A 30 30 0 0 ${angleWithGround > 90 ? 1 : 0} ${rodTopX + 30 * Math.cos(angleWithGround * Math.PI / 180)} ${rodTopY - 30 * Math.sin(angleWithGround * Math.PI / 180)}`}
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="3"
              strokeDasharray="4 2"
            />

            {/* 太阳光线与地面夹角指示线 */}
            <line
              x1={rodTopX}
              y1={rodTopY}
              x2={rodTopX + 80}
              y2={rodTopY}
              stroke="#FF6B6B"
              strokeWidth="2"
              opacity="0.5"
            />
            <line
              x1={rodTopX}
              y1={rodTopY}
              x2={rodTopX + 80 * Math.cos(angleWithGround * Math.PI / 180)}
              y2={rodTopY - 80 * Math.sin(angleWithGround * Math.PI / 180)}
              stroke="#FF6B6B"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* 角度标注 */}
            <text
              x={rodTopX + 60}
              y={rodTopY - 15}
              fill="#FF6B6B"
              fontSize="18"
              fontWeight="bold"
            >
              {Math.round(angleWithGround)}°
            </text>

            {/* 地面标注线 */}
            <line
              x1={0}
              y1={groundY}
              x2={width}
              y2={groundY}
              stroke="#5D4E37"
              strokeWidth="3"
            />

            {/* 标注文字 */}
            <text x="20" y={groundY - 15} fill="#FFF" fontSize="16" fontWeight="bold">地面</text>
            <text x={rodTopX + 20} y={rodTopY - 20} fill="#4A3728" fontSize="16" fontWeight="bold">立表</text>

            {/* 拖动提示 */}
            <g opacity={isDragging ? 0 : 0.8}>
              <text
                x={sunX}
                y={sunY + 85}
                fill="#FF6B6B"
                fontSize="16"
                textAnchor="middle"
                fontWeight="bold"
              >
                拖动太阳 ☀️
              </text>
            </g>
          </svg>
        </div>

        {/* 数据展示区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* 当前节气 */}
          <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl p-5 shadow-lg">
            <div className="text-sm text-amber-700 mb-1">当前节气</div>
            <div className="text-3xl font-bold text-amber-900">{currentTerm.name}</div>
            <div className="text-sm text-amber-600 mt-1">
              正午太阳高度角：{displayedAngle.toFixed(1)}°
            </div>
          </div>

          {/* 影长数据 */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-5 shadow-lg">
            <div className="text-sm text-slate-600 mb-1">影长数据</div>
            <div className="text-3xl font-bold text-slate-800">
              {currentTerm.shadowLength.toFixed(2)} <span className="text-lg">尺</span>
              <span className="text-lg text-slate-500 ml-2">（{(currentTerm.shadowLength * 0.33).toFixed(2)} 米）</span>
            </div>
            <div className="text-sm text-slate-500 mt-1">
              相对影长：{(currentTerm.shadowLength * 100).toFixed(1)}%
            </div>
          </div>

          {/* 太阳位置 */}
          <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-5 shadow-lg">
            <div className="text-sm text-yellow-700 mb-1">太阳位置</div>
            <div className="text-3xl font-bold text-yellow-900">
              {Math.round(sunAngle % 360)}°
            </div>
            <div className="text-sm text-yellow-600 mt-1">
              {sunAngle >= 0 && sunAngle < 90 ? '东北方向' :
               sunAngle >= 90 && sunAngle < 180 ? '东南方向' :
               sunAngle >= 180 && sunAngle < 270 ? '西南方向' : '西北方向'}
            </div>
          </div>
        </div>

        {/* 播放控制 */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg'
              }`}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="flex-1">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>{solarTerms[0].name}</span>
                <span className="font-medium text-amber-600">
                  {currentTerm.name} ({currentTerm.angle}°)
                </span>
                <span>{solarTerms[solarTerms.length - 1].name}</span>
              </div>
              <input
                type="range"
                min="0"
                max={solarTerms.length - 1}
                value={currentIdx}
                onChange={(e) => {
                  const idx = parseInt(e.target.value)
                  setCurrentTermIndex(idx)
                  setSunAngle(solarTerms[idx].angle)
                  setIsPlaying(false)
                }}
                className="w-full h-2 bg-gradient-to-r from-blue-300 via-amber-300 to-red-300 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            二十四节气对照表
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
            {solarTerms.map((term, index) => {
              const isActive = term.name === currentTerm.name
              const isSummer = ['小满', '芒种', '夏至', '小暑', '大暑'].includes(term.name)
              const isWinter = ['小雪', '大雪', '冬至', '小寒', '大寒'].includes(term.name)

              return (
                <div
                  key={index}
                  className={`
                    p-2 rounded-lg text-center transition-all duration-300 cursor-pointer
                    ${isActive ? 'ring-2 ring-amber-700 shadow-lg scale-110' : ''}
                    ${isSummer ? 'bg-orange-50 hover:bg-orange-100' :
                      isWinter ? 'bg-blue-50 hover:bg-blue-100' :
                      'bg-slate-50 hover:bg-slate-100'}
                  `}
                  onClick={() => {
                    setSunAngle(term.angle)
                    setCurrentTermIndex(index)
                  }}
                >
                  <div className={`text-sm font-medium ${isActive ? 'text-amber-700' : 'text-slate-700'}`}>
                    {term.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {term.angle}°
                  </div>
                </div>
              )
            })}
          </div>

          {/* 节气说明 */}
          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              土圭测影原理
            </h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              土圭是最古老的天文仪器，用于测量正午日影的长度。
              古人发现，夏至时太阳最高、影子最短；冬至时太阳最低、影子最长。
              通过长期观测记录影长变化，古人将一年划分为二十四节气，
              用于指导农事活动。这体现了中华民族"天人合一"的智慧。
            </p>
          </div>
        </div>

        {/* 操作说明 */}
        <div className="mt-4 text-center text-sm text-slate-500">
          💡 提示：点击节气卡片可快速跳转，或直接拖动太阳查看影长变化
        </div>
      </div>
    </div>
  )
}

export default App
