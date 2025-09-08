import React, { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { CMSProvider } from "./contexts/CMSContext";
import { HybridCMSProvider } from "./contexts/HybridCMSContext";
import { SupabaseCMSProvider } from "./contexts/SupabaseCMSContext";
import { DynamicCMSProvider } from "./contexts/DynamicCMSContext";
import SEOHead from "./components/SEOHead";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Header from "./components/Header";
import ApiStatusBanner from "./components/ApiStatusBanner";
import DynamicHero from "./components/DynamicHero";
import About from "./components/About";
import DynamicExperience from "./components/DynamicExperience";
import DynamicSkills from "./components/DynamicSkills";
import Projects from "./components/Projects";
import DynamicEducation from "./components/DynamicEducation";
import Blog from "./components/Blog";
import BlogPage from "./components/BlogPage";
import ProjectsPage from "./components/ProjectsPage";
import DynamicCMSDashboard from "./components/DynamicCMSDashboard";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'blog' | 'projects'>('main')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null)
  
  // Модальные окна для главной страницы
  const [mainPageModalProject, setMainPageModalProject] = useState<string | null>(null)
  const [mainPageModalBlogPost, setMainPageModalBlogPost] = useState<string | null>(null)

  const navigateToBlog = (postId?: string) => {
    if (postId) setSelectedBlogPostId(postId)
    setCurrentPage('blog')
  }
  const navigateToProjects = (projectId?: string) => {
    if (projectId) setSelectedProjectId(projectId)
    setCurrentPage('projects')
  }
  const navigateToMain = () => {
    setCurrentPage('main')
    setSelectedProjectId(null)
    setSelectedBlogPostId(null)
    setMainPageModalProject(null)
    setMainPageModalBlogPost(null)
    
    // Прокрутить к верху страницы для корректного позиционирования
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  // Check localStorage validity on app start
  React.useEffect(() => {
    const validateLocalStorage = () => {
      try {
        const savedData = localStorage.getItem('portfolio-cms-data')
        if (savedData) {
          // Try to parse to check if it's valid JSON
          JSON.parse(savedData)
        }
      } catch (error) {
        console.error('Invalid localStorage data, clearing:', error)
        localStorage.removeItem('portfolio-cms-data')
      }
    }
    
    validateLocalStorage()
  }, [])

  return (
    <CMSProvider>
      <SupabaseCMSProvider>
        <HybridCMSProvider>
          <DynamicCMSProvider>
            <SEOHead />
            <GoogleAnalytics gaId={import.meta.env?.VITE_GA_ID || "G-DEVELOPMENT"} />
        {currentPage === 'main' ? (
          <div className="min-h-screen bg-background text-foreground">
            <ApiStatusBanner />
            <Header onBlogClick={navigateToBlog} onProjectsClick={navigateToProjects} />

            <main>
              <DynamicHero onScrollToProjects={scrollToProjects} />
              <About />
              <DynamicExperience />
              <DynamicSkills />
              <Projects 
                onProjectClick={navigateToProjects} 
                onModalProjectClick={setMainPageModalProject}
                expandedProjectId={mainPageModalProject}
                onCloseModal={() => setMainPageModalProject(null)}
              />
              <DynamicEducation />
              <Blog 
                onViewAllClick={navigateToBlog} 
                onPostClick={navigateToBlog}
                onModalPostClick={setMainPageModalBlogPost}
                expandedPostId={mainPageModalBlogPost}
                onCloseModal={() => setMainPageModalBlogPost(null)}
              />
              <DynamicCMSDashboard />
              <Contact />
            </main>

            <Footer />
          </div>
        ) : currentPage === 'blog' ? (
          <BlogPage 
            onBackToMain={navigateToMain}
            selectedBlogPostId={selectedBlogPostId}
            onBlogPostSelect={setSelectedBlogPostId}
          />
        ) : (
          <ProjectsPage 
            onBackToMain={navigateToMain} 
            selectedProjectId={selectedProjectId}
            onProjectSelect={setSelectedProjectId}
          />
        )}

            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                },
              }}
            />
          </DynamicCMSProvider>
        </HybridCMSProvider>
      </SupabaseCMSProvider>
    </CMSProvider>
  );
}