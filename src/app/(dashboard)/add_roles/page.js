"use client"
import { useState, useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
import styles from '@/styles/custom_page.module.css';

export default function add_role() {
  // The chart is only created/updated when `chartData` is set, which happens after generating the chart
  


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.topSection}></div>
        <div className={styles.content}>
          <h1 style={{ color: 'grey', fontWeight: 'bold', fontSize:'18px' }}>CEMERIC PLANT TRENDS</h1>
        </div>
      </div>
    </div>
  );
}
