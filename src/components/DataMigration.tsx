import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle, AlertCircle, Database, Upload, Download } from 'lucide-react';
import { useHybridCMS } from '../contexts/HybridCMSContext';
import { useCMS } from '../contexts/CMSContext';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface MigrationStats {
  blogPosts: number;
  portfolioItems: number;
}

export const DataMigration: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState(0);
  const [migrationStats, setMigrationStats] = useState<MigrationStats | null>(null);

  const hybridCMS = useHybridCMS();
  const localCMS = useCMS();

  const handleExportData = async () => {
    try {
      setIsExporting(true);
      
      const data = {
        blogPosts: localCMS.state.blogPosts,
        portfolioItems: localCMS.state.portfolioItems,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      };

      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Данные успешно экспортированы');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Ошибка при экспорте данных');
    } finally {
      setIsExporting(false);
    }
  };

  const handleMigrateToSupabase = async () => {
    if (hybridCMS.dataSource !== 'localStorage') {
      toast.error('Миграция доступна только из localStorage режима');
      return;
    }

    if (!hybridCMS.isSupabaseAvailable) {
      toast.error('Supabase не настроен');
      return;
    }

    try {
      setIsImporting(true);
      setMigrationProgress(0);

      const data = {
        blogPosts: localCMS.state.blogPosts,
        portfolioItems: localCMS.state.portfolioItems
      };

      setMigrationProgress(25);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c2360911/api/migrate-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(data)
      });

      setMigrationProgress(75);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMigrationProgress(100);
      
      setMigrationStats(result.results);
      
      toast.success(`Миграция завершена! Перенесено ${result.results.blogPosts} постов и ${result.results.portfolioItems} проектов`);
      
      // Refresh data
      if (hybridCMS.refetch) {
        await hybridCMS.refetch();
      }
      
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('Ошибка при миграции данных в Supabase');
    } finally {
      setIsImporting(false);
      setTimeout(() => {
        setMigrationProgress(0);
        setMigrationStats(null);
      }, 3000);
    }
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsImporting(true);
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!data.blogPosts || !data.portfolioItems) {
        throw new Error('Неверный формат файла');
      }

      // Import to localStorage
      data.blogPosts.forEach((post: any) => {
        localCMS.dispatch({ type: 'CREATE_POST', payload: post });
      });

      data.portfolioItems.forEach((item: any) => {
        localCMS.dispatch({ type: 'CREATE_PROJECT', payload: item });
      });

      toast.success(`Импортировано ${data.blogPosts.length} постов и ${data.portfolioItems.length} проектов`);
      
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Ошибка при импорте данных');
    } finally {
      setIsImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Data Source */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Текущий источник данных
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {hybridCMS.dataSource === 'supabase' ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Supabase (Облачная база данных)</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>localStorage (Локальное хранилище)</span>
              </>
            )}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Блог-посты: {hybridCMS.blogPosts.length} | Проекты: {hybridCMS.portfolioItems.length}
          </div>
        </CardContent>
      </Card>

      {/* Export/Import Local Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Экспорт/Импорт данных
          </CardTitle>
          <CardDescription>
            Создавайте резервные копии или переносите данные между устройствами
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              onClick={handleExportData}
              disabled={isExporting || localCMS.state.blogPosts.length === 0}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Экспорт...' : 'Экспорт данных'}
            </Button>
            
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                disabled={isImporting}
                className="hidden"
                id="import-file"
              />
              <Button
                onClick={() => document.getElementById('import-file')?.click()}
                disabled={isImporting}
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isImporting ? 'Импорт...' : 'Импорт данных'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supabase Migration */}
      {hybridCMS.dataSource === 'localStorage' && hybridCMS.isSupabaseAvailable && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Миграция в Supabase
            </CardTitle>
            <CardDescription>
              Перенесите данные из localStorage в облачную базу данных Supabase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {migrationProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Прогресс миграции</span>
                  <span>{migrationProgress}%</span>
                </div>
                <Progress value={migrationProgress} className="w-full" />
              </div>
            )}

            {migrationStats && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>Миграция завершена успешно!</span>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  Перенесено блог-постов: {migrationStats.blogPosts}<br />
                  Перенесено проектов: {migrationStats.portfolioItems}
                </div>
              </div>
            )}

            <Button
              onClick={handleMigrateToSupabase}
              disabled={isImporting || localCMS.state.blogPosts.length === 0}
              className="w-full"
            >
              <Database className="h-4 w-4 mr-2" />
              {isImporting ? 'Миграция в процессе...' : 'Мигрировать в Supabase'}
            </Button>

            <div className="text-sm text-muted-foreground">
              <p>⚠️ Важно:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>После миграции система автоматически переключится на Supabase</li>
                <li>Данные в localStorage останутся без изменений</li>
                <li>Вы сможете получить доступ к данным с любого устройства</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supabase Status */}
      {!hybridCMS.isSupabaseAvailable && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertCircle className="h-5 w-5" />
              Supabase не настроен
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-600 mb-4">
              Для использования облачной синхронизации данных необходимо настроить Supabase.
            </p>
            <Button variant="outline" className="text-yellow-700 border-yellow-300">
              <Database className="h-4 w-4 mr-2" />
              Инструкция по настройке
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};