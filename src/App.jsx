import React, { useState } from 'react'
import CanvasPreview from './components/CanvasPreview'
import LayerPanel from './components/LayerPanel'

// 修正的示例JSON数据 - 匹配用户图片的效果
const sampleData = {
  "anglogSourceOverlap": "0",
  "cameraSourceOverlap": "1",
  "resolution": "{\"width\":1280,\"height\":720}",
  "sourceInfo": "{\"camera\":{\"sourceList\":[{\"overlap\":1,\"canvasOverlap\":1,\"canvasOverlapRect\":[0,0,1280,720],\"name\":\"摄像头\",\"isSoftware\":true,\"opacity\":-1,\"deviceId\":\"camera-1\",\"layer\":1}],\"totalOverlap\":1},\"process\":{\"sourceList\":[{\"exeName\":\"游戏进程\",\"canvasOverlap\":0,\"overlap\":1,\"canvasOverlapRect\":[0,0,1280,720],\"layer\":2}],\"totalOverlap\":1}}"
}

function App() {
  const [jsonData, setJsonData] = useState(JSON.stringify(sampleData, null, 2))
  const [parsedData, setParsedData] = useState(null)
  const [error, setError] = useState('')

  const parseJsonData = () => {
    try {
      const data = JSON.parse(jsonData)
      
      // 解析resolution
      const resolution = JSON.parse(data.resolution)
      
      // 解析sourceInfo
      const sourceInfo = JSON.parse(data.sourceInfo)
      
      // 收集所有图层
      const layers = []
      
      Object.keys(sourceInfo).forEach(sourceType => {
        const sourceList = sourceInfo[sourceType].sourceList || []
        sourceList.forEach(source => {
          layers.push({
            ...source,
            sourceType,
            name: source.name || source.exeName || `${sourceType}源`
          })
        })
      })
      
      // 按layer排序
      layers.sort((a, b) => a.layer - b.layer)
      
      setParsedData({
        resolution,
        layers,
        originalData: data
      })
      setError('')
    } catch (err) {
      setError('JSON解析失败: ' + err.message)
      setParsedData(null)
    }
  }

  // 组件加载时自动解析示例数据
  React.useEffect(() => {
    parseJsonData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">PC窗口源可视化</h1>
          <p className="text-gray-600 mt-1">基于JSON数据的图层预览工具</p>
        </div>
      </header>

      {/* JSON输入区域 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">JSON数据输入</h2>
          <div className="space-y-4">
            <textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-md font-mono text-sm"
              placeholder="请输入JSON数据..."
            />
            <div className="flex space-x-3">
              <button
                onClick={parseJsonData}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                解析数据
              </button>
              <button
                onClick={() => setJsonData(JSON.stringify(sampleData, null, 2))}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                加载示例
              </button>
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* 主要内容区域 */}
        {parsedData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 画布预览 */}
            <div className="lg:col-span-2">
              <CanvasPreview data={parsedData} />
            </div>
            
            {/* 层级信息面板 */}
            <div className="lg:col-span-1">
              <LayerPanel layers={parsedData.layers} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App 