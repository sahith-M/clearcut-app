import { useState, useCallback, useRef, useEffect } from 'react'

// API Configuration
const API_URL = import.meta.env.PROD ? 'https://clearcut-api-production.up.railway.app' : 'http://localhost:8000'

// ============================================
// SVG Icons
// ============================================
const Icons = {
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Refresh: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"/>
      <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
      <path d="M5 3L5.5 4.5L7 5L5.5 5.5L5 7L4.5 5.5L3 5L4.5 4.5L5 3Z"/>
    </svg>
  ),
  Clipboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

// ============================================
// Toast Notification Component
// ============================================
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === 'success' ? <Icons.Check /> : <Icons.X />}
      </div>
      <span>{message}</span>
    </div>
  )
}

// ============================================
// Upload Zone Component
// ============================================
function UploadZone({ onFileSelect, disabled }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const handleDragOut = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (disabled) return
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }, [onFileSelect, disabled])

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
    e.target.value = ''
  }

  useEffect(() => {
    const handlePaste = (e) => {
      if (disabled) return
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile()
          if (file) {
            onFileSelect(file)
            break
          }
        }
      }
    }
    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [onFileSelect, disabled])

  return (
    <div
      className={`upload-zone ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      <div className="upload-icon">
        <Icons.Upload />
      </div>
      <h2 className="upload-title">Drop your image here</h2>
      <p className="upload-subtitle">
        or <span className="upload-link">browse files</span>
      </p>
      <div className="upload-hint">
        <span><Icons.Clipboard /> Paste from clipboard</span>
        <span>JPG, PNG, WebP up to 20MB</span>
      </div>
    </div>
  )
}

// ============================================
// Processing Overlay
// ============================================
function ProcessingOverlay() {
  return (
    <div className="processing-overlay">
      <div className="processing-content">
        <div className="processing-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-icon">
            <Icons.Sparkles />
          </div>
        </div>
        <h3>Removing background...</h3>
        <p>This usually takes 2-5 seconds</p>
      </div>
    </div>
  )
}

// ============================================
// Background Picker
// ============================================
const PRESET_COLORS = [
  { id: 'transparent', label: 'Transparent', value: 'transparent' },
  { id: 'white', label: 'White', value: '#ffffff' },
  { id: 'black', label: 'Black', value: '#000000' },
  { id: 'gray', label: 'Gray', value: '#f3f4f6' },
  { id: 'red', label: 'Red', value: '#ef4444' },
  { id: 'blue', label: 'Blue', value: '#3b82f6' },
  { id: 'green', label: 'Green', value: '#22c55e' },
  { id: 'purple', label: 'Purple', value: '#8b5cf6' },
]

function BackgroundPicker({ selected, onChange }) {
  const [customColor, setCustomColor] = useState('#6366f1')
  
  return (
    <div className="bg-picker">
      <label className="bg-picker-label">Background</label>
      <div className="bg-picker-options">
        {PRESET_COLORS.map((color) => (
          <button
            key={color.id}
            className={`bg-option ${selected === color.value ? 'selected' : ''} ${color.id === 'transparent' ? 'transparent' : ''}`}
            style={color.value !== 'transparent' ? { backgroundColor: color.value } : {}}
            onClick={() => onChange(color.value)}
            title={color.label}
          >
            {selected === color.value && <Icons.Check />}
          </button>
        ))}
        <div className="bg-option-custom">
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value)
              onChange(e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ============================================
// Before/After Slider
// ============================================
function ComparisonSlider({ originalSrc, processedSrc, bgColor }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percentage)
  }, [])

  const handleMouseDown = (e) => {
    isDragging.current = true
    handleMove(e.clientX)
  }

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return
    handleMove(e.clientX)
  }, [handleMove])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleTouchStart = (e) => {
    isDragging.current = true
    handleMove(e.touches[0].clientX)
  }

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return
    handleMove(e.touches[0].clientX)
  }, [handleMove])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove])

  const getBgStyle = () => {
    if (bgColor === 'transparent') {
      return { backgroundImage: 'var(--checkerboard)' }
    }
    return { backgroundColor: bgColor }
  }

  return (
    <div 
      className="comparison-slider" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="comparison-before">
        <img src={originalSrc} alt="Original" draggable="false" />
        <span className="comparison-label">Before</span>
      </div>
      <div 
        className="comparison-after" 
        style={{ 
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          ...getBgStyle()
        }}
      >
        <img src={processedSrc} alt="Processed" draggable="false" />
        <span className="comparison-label">After</span>
      </div>
      <div className="comparison-handle" style={{ left: `${position}%` }}>
        <div className="handle-line"></div>
        <div className="handle-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Result View
// ============================================
function ResultView({ 
  originalFile, 
  originalUrl, 
  processedUrl, 
  processingTime,
  onReset,
  onDownload,
  bgColor,
  onBgColorChange,
  isDownloading
}) {
  const [downloadFormat, setDownloadFormat] = useState('png')
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }
  
  return (
    <div className="result-view">
      <div className="result-header">
        <button className="btn btn-ghost" onClick={onReset}>
          <Icons.Refresh />
          New Image
        </button>
        {processingTime && (
          <div className="processing-badge">
            <Icons.Clock />
            Processed in {processingTime.toFixed(1)}s
          </div>
        )}
      </div>
      
      <div className="result-main">
        <ComparisonSlider 
          originalSrc={originalUrl} 
          processedSrc={processedUrl}
          bgColor={bgColor}
        />
      </div>
      
      {originalFile && (
        <div className="file-info">
          <span className="file-name">{originalFile.name}</span>
          <span className="file-size">{formatFileSize(originalFile.size)}</span>
        </div>
      )}
      
      <div className="result-controls">
        <BackgroundPicker selected={bgColor} onChange={onBgColorChange} />
        
        <div className="download-section">
          <label className="download-label">Format</label>
          <div className="format-options">
            {['png', 'jpg', 'webp'].map((format) => (
              <button
                key={format}
                className={`format-btn ${downloadFormat === format ? 'selected' : ''}`}
                onClick={() => setDownloadFormat(format)}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          className={`btn btn-primary btn-download ${isDownloading ? 'loading' : ''}`}
          onClick={() => onDownload(downloadFormat)}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <div className="btn-spinner"></div>
              Preparing...
            </>
          ) : (
            <>
              <Icons.Download />
              Download {downloadFormat.toUpperCase()}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ============================================
// Features Section
// ============================================
function FeaturesSection() {
  const features = [
    { icon: <Icons.Zap />, title: 'Lightning Fast', description: 'AI-powered processing in under 5 seconds' },
    { icon: <Icons.Shield />, title: 'Privacy First', description: 'Images deleted after processing. No storage.' },
    { icon: <Icons.Layers />, title: 'HD Quality', description: 'Full resolution downloads, no compression' },
    { icon: <Icons.Heart />, title: 'Always Free', description: 'No signup, no limits, no watermarks' }
  ]
  
  return (
    <section className="features-section">
      <div className="features-grid">
        {features.map((feature, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================
// Main App Component
// ============================================
export default function App() {
  const [state, setState] = useState('idle')
  const [originalFile, setOriginalFile] = useState(null)
  const [originalUrl, setOriginalUrl] = useState(null)
  const [processedUrl, setProcessedUrl] = useState(null)
  const [error, setError] = useState(null)
  const [bgColor, setBgColor] = useState('transparent')
  const [processingTime, setProcessingTime] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => setToast({ message, type })

  const handleFileSelect = useCallback(async (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('File size must be under 20MB')
      return
    }

    setOriginalFile(file)
    setOriginalUrl(URL.createObjectURL(file))
    setState('processing')
    setError(null)
    setProcessingTime(null)

    const startTime = performance.now()

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${API_URL}/remove-background`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Processing failed')
      }

      const blob = await response.blob()
      setProcessedUrl(URL.createObjectURL(blob))
      setProcessingTime((performance.now() - startTime) / 1000)
      setState('done')
    } catch (err) {
      console.error('Processing error:', err)
      setError(err.message || 'Failed to process image. Please try again.')
      setState('error')
    }
  }, [])

  const handleReset = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    if (processedUrl) URL.revokeObjectURL(processedUrl)
    setOriginalFile(null)
    setOriginalUrl(null)
    setProcessedUrl(null)
    setError(null)
    setState('idle')
    setBgColor('transparent')
    setProcessingTime(null)
  }, [originalUrl, processedUrl])

  const handleDownload = useCallback(async (format) => {
    if (!originalFile) return
    setIsDownloading(true)

    try {
      const formData = new FormData()
      formData.append('file', originalFile)

      const params = new URLSearchParams({
        output_format: format,
        ...(bgColor !== 'transparent' && { bg_color: bgColor })
      })

      const response = await fetch(`${API_URL}/remove-background?${params}`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${originalFile.name.replace(/\.[^/.]+$/, '')}_nobg.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      showToast(`Downloaded as ${format.toUpperCase()}!`)
    } catch (err) {
      showToast('Download failed. Please try again.', 'error')
    } finally {
      setIsDownloading(false)
    }
  }, [originalFile, bgColor])

  return (
    <div className="app">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <header className="header">
        <div className="header-brand">
          <a href="/" className="logo">
            <svg viewBox="0 0 32 32" className="logo-icon">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
              <circle cx="16" cy="16" r="14" fill="none" stroke="url(#logoGrad)" strokeWidth="2" strokeDasharray="4 2"/>
              <path d="M11 16 L14 19 L21 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">ClearCut</span>
          </a>
        </div>
        <nav className="header-nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-icon">
            <Icons.Github />
          </a>
        </nav>
      </header>

      <main className="main">
        {state === 'idle' && (
          <div className="hero">
            <div className="hero-badge">
              <Icons.Sparkles />
              100% Free • No Signup • No Limits
            </div>
            <h1 className="hero-title">
              Remove backgrounds <span className="gradient-text">instantly</span>
            </h1>
            <p className="hero-subtitle">
              AI-powered background removal. HD quality downloads, no watermarks, completely free forever.
            </p>
          </div>
        )}

        <div className="tool-container">
          {state === 'idle' && <UploadZone onFileSelect={handleFileSelect} disabled={false} />}
          
          {state === 'processing' && (
            <div className="tool-processing">
              <div className="processing-preview">
                <img src={originalUrl} alt="Processing" />
              </div>
              <ProcessingOverlay />
            </div>
          )}
          
          {state === 'done' && (
            <ResultView
              originalFile={originalFile}
              originalUrl={originalUrl}
              processedUrl={processedUrl}
              processingTime={processingTime}
              onReset={handleReset}
              onDownload={handleDownload}
              bgColor={bgColor}
              onBgColorChange={setBgColor}
              isDownloading={isDownloading}
            />
          )}
          
          {state === 'error' && (
            <div className="error-state">
              <div className="error-icon"><Icons.X /></div>
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button className="btn btn-primary" onClick={handleReset}>Try Again</button>
            </div>
          )}
        </div>

        {state === 'idle' && <FeaturesSection />}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>Made with care. Your images are never stored.</p>
          <p className="footer-links">
            <a href="#">Privacy</a><span>•</span><a href="#">Terms</a><span>•</span><a href="#">Contact</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
