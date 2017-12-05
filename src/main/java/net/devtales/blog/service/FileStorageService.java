package net.devtales.blog.service;

import com.google.common.io.Files;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Component
public class FileStorageService {

    public String store(MultipartFile file) {
        String fileName = UUID.randomUUID().toString() + "." + extractFileExtension(file.getOriginalFilename());
        File serverFile = new File("blog-content/" + fileName);
        try {
            Files.createParentDirs(serverFile);
            serverFile.createNewFile();
            Files.write(file.getBytes(), serverFile);
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file",e);
        }
    }

    public String thumbnail(String fileName) {
        try {
            BufferedImage img = ImageIO.read(new File("blog-content/" + fileName));
            BufferedImage scaledImage = scaleImage(img);
            ImageIO.write(scaledImage, "jpg", new File("blog-content/" + "thumb-" + fileName));
        } catch (IOException e) {
            throw new RuntimeException("Failed to create thumbnail for a file", e);
        }

        return "thumb-" + fileName;
    }

    private BufferedImage scaleImage(BufferedImage img) {
        final int preferredWidth = 100;
        final int preferredHeight = 100;
        int xTimes = img.getWidth() / preferredWidth;
        int yTimes = img.getHeight() / preferredHeight;
        int times = xTimes >= yTimes ? xTimes : yTimes;

        int scaleX = new Double(img.getWidth() * (1.0 / times)).intValue();
        int scaleY = new Double(img.getHeight() * (1.0 / times)).intValue();
        Image image = img.getScaledInstance(scaleX, scaleY, Image.SCALE_SMOOTH);
        BufferedImage buffered = new BufferedImage(scaleX, scaleY, BufferedImage.TYPE_INT_RGB);
        buffered.getGraphics().drawImage(image, 0, 0 , null);

        return buffered;
    }

    private String extractFileExtension(String fileName) {
        String[] splitted = fileName.split("\\.");
        return splitted[splitted.length - 1];
    }
}
