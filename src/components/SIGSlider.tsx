'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { SIG } from '@/lib/supabase'

interface SIGSliderProps {
  sigs: SIG[]
}

export default function SIGSlider({ sigs }: SIGSliderProps) {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Available Special Interest Groups
        </h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {sigs.map((sig) => (
            <SwiperSlide key={sig.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${sig.image_url})` }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{sig.name}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                      {sig.acronym}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{sig.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {sig.focus_areas.slice(0, 3).map((area, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/sigs/${sig.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Learn More
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}