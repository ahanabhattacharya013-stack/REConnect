import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  Table,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Download,
  BarChart3,
  Brain,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { AreaChartComponent } from '@/components/charts/AreaChartComponent';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { PieChartComponent } from '@/components/charts/PieChartComponent';
import { chartColors } from '@/components/charts/ChartColors';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  data?: any;
}

export default function UploadPage() {
  const { setUploadedData, setAnalysisResults, analysisResults, addNotification } = useApp();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const processFile = useCallback(async (file: File): Promise<any> => {
    // Simulate file processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate mock analyzed data based on file
        const mockData = {
          properties: Math.floor(Math.random() * 20) + 5,
          totalValue: Math.floor(Math.random() * 50) + 10,
          avgScore: Math.floor(Math.random() * 30) + 70,
          riskDistribution: {
            low: Math.floor(Math.random() * 40) + 30,
            medium: Math.floor(Math.random() * 30) + 20,
            high: 100 - (Math.floor(Math.random() * 40) + 30) - (Math.floor(Math.random() * 30) + 20),
          },
          trends: [
            { month: 'Jan', value: 100 + Math.random() * 10 },
            { month: 'Feb', value: 102 + Math.random() * 10 },
            { month: 'Mar', value: 105 + Math.random() * 10 },
            { month: 'Apr', value: 108 + Math.random() * 10 },
            { month: 'May', value: 110 + Math.random() * 10 },
            { month: 'Jun', value: 112 + Math.random() * 10 },
          ],
        };
        resolve(mockData);
      }, 2000);
    });
  }, []);

  const handleFileUpload = useCallback(async (uploadedFiles: FileList) => {
    const newFiles: UploadedFile[] = Array.from(uploadedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Process each file
    for (const fileInfo of newFiles) {
      const file = Array.from(uploadedFiles).find((f) => f.name === fileInfo.name);
      if (!file) continue;

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileInfo.id
              ? { ...f, progress, status: progress < 100 ? 'uploading' : 'processing' }
              : f
          )
        );
      }

      // Process file
      try {
        const data = await processFile(file);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileInfo.id ? { ...f, status: 'completed', data } : f
          )
        );
        toast.success(`${fileInfo.name} processed successfully`);
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileInfo.id ? { ...f, status: 'error' } : f
          )
        );
        toast.error(`Failed to process ${fileInfo.name}`);
      }
    }
  }, [processFile]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate comprehensive analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    const completedFiles = files.filter((f) => f.status === 'completed');
    const aggregatedData = {
      totalProperties: completedFiles.reduce((sum, f) => sum + (f.data?.properties || 0), 0),
      totalValue: completedFiles.reduce((sum, f) => sum + (f.data?.totalValue || 0), 0),
      avgScore: Math.round(
        completedFiles.reduce((sum, f) => sum + (f.data?.avgScore || 0), 0) / completedFiles.length
      ),
      filesProcessed: completedFiles.length,
      trends: [
        { month: 'Jan', analyzed: 95, verified: 88 },
        { month: 'Feb', analyzed: 98, verified: 91 },
        { month: 'Mar', analyzed: 102, verified: 95 },
        { month: 'Apr', analyzed: 108, verified: 100 },
        { month: 'May', analyzed: 112, verified: 106 },
        { month: 'Jun', analyzed: 118, verified: 112 },
      ],
      sectors: [
        { name: 'Residential', value: 35 },
        { name: 'Commercial', value: 30 },
        { name: 'Industrial', value: 20 },
        { name: 'Retail', value: 15 },
      ],
      cities: [
        { name: 'Mumbai', score: 92, properties: 12 },
        { name: 'Bangalore', score: 89, properties: 8 },
        { name: 'Delhi', score: 85, properties: 6 },
        { name: 'Hyderabad', score: 88, properties: 5 },
        { name: 'Chennai', score: 84, properties: 4 },
      ],
    };

    setAnalysisResults(aggregatedData);
    setIsAnalyzing(false);
    
    addNotification({
      type: 'success',
      title: 'Analysis Complete',
      message: `Analyzed ${aggregatedData.totalProperties} properties from ${aggregatedData.filesProcessed} files.`,
    });
    
    toast.success('Analysis completed successfully!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv')) {
      return <FileSpreadsheet className="w-6 h-6" />;
    }
    if (type.includes('pdf')) {
      return <FileText className="w-6 h-6" />;
    }
    return <Table className="w-6 h-6" />;
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-display font-bold">Upload & Analyze</h1>
            <p className="text-muted-foreground mt-1">
              Upload property data, market reports, or financial spreadsheets for AI analysis
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Dropzone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`glass-card p-8 border-2 border-dashed transition-all duration-200 ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supports CSV, Excel, PDF, and JSON files
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".csv,.xlsx,.xls,.pdf,.json"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  />
                  <label htmlFor="file-upload">
                    <Button className="btn-primary cursor-pointer" asChild>
                      <span>Select Files</span>
                    </Button>
                  </label>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="glass-card p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Uploaded Files</h3>
                    <span className="text-sm text-muted-foreground">
                      {files.filter((f) => f.status === 'completed').length}/{files.length} processed
                    </span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                      >
                        <div className="text-primary">{getFileIcon(file.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                          {file.status === 'uploading' && (
                            <Progress value={file.progress} className="h-1 mt-2" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {file.status === 'uploading' && (
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          )}
                          {file.status === 'processing' && (
                            <Loader2 className="w-4 h-4 animate-spin text-warning" />
                          )}
                          {file.status === 'completed' && (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          )}
                          {file.status === 'error' && (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full btn-primary gap-2"
                    onClick={runAnalysis}
                    disabled={
                      isAnalyzing || files.filter((f) => f.status === 'completed').length === 0
                    }
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        Run AI Analysis
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Supported Formats */}
              <div className="glass-card p-4">
                <h4 className="font-semibold mb-3">Supported Formats</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-success" />
                    <span>Excel (.xlsx, .xls)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Table className="w-4 h-4 text-success" />
                    <span>CSV files</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-success" />
                    <span>PDF reports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-success" />
                    <span>JSON data</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Analysis Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {analysisResults ? (
                <>
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 text-center">
                      <div className="text-3xl font-bold gradient-text">
                        {analysisResults.totalProperties}
                      </div>
                      <div className="text-sm text-muted-foreground">Properties Found</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <div className="text-3xl font-bold text-primary">
                        ₹{analysisResults.totalValue} Cr
                      </div>
                      <div className="text-sm text-muted-foreground">Total Value</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <div className="text-3xl font-bold text-success">
                        {analysisResults.avgScore}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Score</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <div className="text-3xl font-bold">
                        {analysisResults.filesProcessed}
                      </div>
                      <div className="text-sm text-muted-foreground">Files Processed</div>
                    </div>
                  </div>

                  {/* Trend Chart */}
                  <AreaChartComponent
                    data={analysisResults.trends}
                    xAxisKey="month"
                    dataKeys={[
                      { key: 'analyzed', name: 'Analyzed', color: chartColors.pink },
                      { key: 'verified', name: 'Verified', color: chartColors.lavender },
                    ]}
                    title="Analysis Trends"
                    height={220}
                  />

                  {/* Sector Distribution */}
                  <PieChartComponent
                    data={analysisResults.sectors}
                    title="Sector Distribution"
                    height={250}
                    innerRadius={50}
                    outerRadius={80}
                  />

                  {/* City Performance */}
                  <BarChartComponent
                    data={analysisResults.cities}
                    xAxisKey="name"
                    dataKeys={[
                      { key: 'score', name: 'Score', color: chartColors.pink },
                      { key: 'properties', name: 'Properties', color: chartColors.lavender },
                    ]}
                    title="City Analysis"
                    height={220}
                  />
                </>
              ) : (
                <div className="glass-card p-12 text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                    <BarChart3 className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground">
                    Upload files and run AI analysis to see results here
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
