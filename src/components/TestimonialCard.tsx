import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div
      id={`testimonial-${testimonial.id}`}
      className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-400 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
        </div>

        {/* Quote text */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic relative">
          <span className="text-slate-300 font-serif text-3xl leading-none absolute -top-2 -left-1">“</span>
          <span className="relative z-10 pl-3.5 block">{testimonial.quote}</span>
        </p>
      </div>

      {/* Author profile */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border border-slate-200"
        />
        <div>
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1">
            {testimonial.name}
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          </h4>
          <p className="text-[11px] text-slate-500 font-medium">
            {testimonial.role} • <span className="text-slate-700">{testimonial.workplace}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
