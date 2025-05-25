'use client'

import { Button } from '@/components/ui/button'
import { Rocket, Shield, Zap, Star, Check, ArrowRight } from 'lucide-react'

const iconMap = {
  'rocket': Rocket,
  'shield': Shield,
  'zap': Zap,
  'star': Star,
  'check': Check,
  'arrow-right': ArrowRight,
}

export default function LandingPageTemplate({ page }: { page: any }) {
  const content = page.content
  const theme = content.style?.theme || 'modern'
  const primaryColor = content.style?.primaryColor || '#000000'

  // Get icon component
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || Zap
    return Icon
  }

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        .primary-button {
          background-color: ${primaryColor};
          color: white;
        }
        .primary-button:hover {
          opacity: 0.9;
        }
        .primary-text {
          color: ${primaryColor};
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {content.hero.headline}
            </h1>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 mb-10">
              {content.hero.subheadline}
            </p>
            <Button size="lg" className="primary-button text-lg px-8 py-6">
              {content.hero.ctaText}
            </Button>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              background: `linear-gradient(to tr, ${primaryColor}20, ${primaryColor}40)`,
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      {content.features && content.features.length > 0 && (
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Features</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Everything you need to succeed
              </p>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
              {content.features.map((feature: any, index: number) => {
                const Icon = getIcon(feature.icon)
                return (
                  <div key={index} className="relative pl-16">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg primary-button">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold leading-7">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {content.benefits && content.benefits.items.length > 0 && (
        <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
                {content.benefits.headline}
              </h2>
              <ul className="space-y-4">
                {content.benefits.items.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-6 w-6 primary-text flex-shrink-0 mt-1" />
                    <span className="ml-3 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {content.cta.headline}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {content.cta.subheadline}
            </p>
            <div className="mt-10">
              <Button size="lg" className="primary-button text-lg px-8 py-6">
                {content.cta.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} {page.title}. Built with Autosite.
          </p>
        </div>
      </footer>
    </div>
  )
}