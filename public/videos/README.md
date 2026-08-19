# Video Assets

Add the following video files to this directory:

## Required Videos

### 1. `hero-factory.mp4`
- **Used in:** Hero section background
- **Description:** Short looping clip of factory production line (5-15 seconds)
- **Recommended:** 1920x1080, H.264, under 5MB for fast loading
- **Note:** Falls back to `/images/hero-bg.svg` poster image if video fails to load

### 2. `factory-tour.mp4`
- **Used in:** VideoSection factory tour modal
- **Description:** Full factory tour walkthrough (2-5 minutes)
- **Recommended:** 1920x1080, H.264, under 50MB
- **Note:** Currently shows placeholder player — replace with actual footage

## Optimization Tips

- Compress videos with [HandBrake](https://handbrake.fr/) or `ffmpeg`
- Use H.264 codec for maximum browser compatibility
- Target bitrate: 4-6 Mbps for 1080p
- Consider providing a WebM version for better compression
- Use `poster` attribute on `<video>` tags to show preview before load
