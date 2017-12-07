package net.devtales.blog.service;

import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.FrameConverter;
import org.bytedeco.javacv.FrameGrabber;
import org.bytedeco.javacv.Java2DFrameConverter;

import java.awt.image.BufferedImage;
import java.io.File;

public class VideoUtils {
    public static BufferedImage getBufferedImageFromVideo(File file) {
        FFmpegFrameGrabber g = new FFmpegFrameGrabber(file);
        try {
            g.start();
            FrameConverter converter = new Java2DFrameConverter();
            return (BufferedImage) converter.convert(g.grabImage());
        } catch (FrameGrabber.Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                g.stop();
            } catch (FrameGrabber.Exception e) {
                throw new RuntimeException(e);
            }
        }

    }
}
