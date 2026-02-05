import React from 'react'
import styles from './Hero.module.css'

const Hero = () => {
    return (
        <div className={styles.heroContainer}>
            <video
                className={styles.heroVideo}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={styles.heroOverlay}></div>

            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Welcome to Swiss Village Zakho</h1>

                <p className={styles.heroSubtitle}>
                    Where luxury living meets serenity.
                </p>

                <p className={styles.heroDescription}>
                    A private residential community designed to bring comfort, elegance, and family focused living to the city of Zakho. Surrounded by open landscapes and premium amenities, Swiss Village offers modern villas with exceptional architectural standards and a peaceful lifestyle just 8 minutes from the city center.

                </p>
            </div>
        </div>
    )
}

export default Hero