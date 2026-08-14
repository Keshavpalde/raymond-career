"use client";

import styles from "./EmployeeTestimonials.module.css";

import TestimonialCard from "./TestimonialCard";

import { TestimonialItem } from "@/types/employeeTestimonials";

interface Props {
  testimonials: TestimonialItem[];
  activeId: number;
  onSelect: (testimonial: TestimonialItem) => void;
}

export default function TestimonialList({
  testimonials,
  activeId,
  onSelect,
}: Props) {
  return (
    <div className={styles.listWrapper}>
      {testimonials.map((item) => (
        <TestimonialCard
          key={item.id}
          testimonial={item}
          active={item.id === activeId}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}