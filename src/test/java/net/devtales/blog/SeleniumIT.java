package net.devtales.blog;

import io.github.bonigarcia.wdm.WebDriverManager;
import net.devtales.blog.service.ArticlesService;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static net.devtales.blog.TestUtils.printScreenshotToString;
import static org.junit.Assert.assertTrue;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = DevtalesApplication.class)
@ActiveProfiles("ci")
@AutoConfigureMockMvc
public class SeleniumIT {
    private WebDriver webDriver = setupDriver();
    private WebDriverWait wait = new WebDriverWait(webDriver, 10);

    private ChromeDriver setupDriver() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        DesiredCapabilities dc = DesiredCapabilities.chrome();
        dc.setCapability(ChromeOptions.CAPABILITY, options);
        return new ChromeDriver(dc);
    }

    @After
    public void close() throws Exception {
        printScreenshotToString(webDriver);
        if (webDriver != null) {
            webDriver.quit();
        }
    }

    @LocalServerPort
    private int port;

    @Autowired
    ArticlesService articlesService;

    @Test
    public void canOpenIndexPage() {
        webDriver.get("http://localhost:" + port + "/");
        WebElement logo = find(By.id("logo"));
        assertTrue(logo.isDisplayed());
        WebElement articles = find(By.className("article-short"));
        assertTrue(articles.isDisplayed());
    }

    @Test
    public void canOpenProjectsPage() {
        webDriver.get("http://localhost:" + port + "/projects");
        WebElement tile = find(By.className("tile"));
        assertTrue(tile.isDisplayed());
    }

    @Test
    public void canOpenAboutMePage() {
        webDriver.get("http://localhost:" + port + "/about");

        WebElement socialBar = find(By.className("social"));
        assertTrue(socialBar.isDisplayed());
    }

    @Test
    public void canNavigateClientSide() {
        webDriver.get("http://localhost:" + port + "/");
        WebElement logo = find(By.id("logo"));
        assertTrue(logo.isDisplayed());

        webDriver.findElement(By.linkText("About")).click();
        WebElement socialBar = find(By.className("social"));
        assertTrue(socialBar.isDisplayed());

        webDriver.findElement(By.linkText("Projects")).click();
        WebElement tile = find(By.className("tile"));
        assertTrue(tile.isDisplayed());
    }

    private WebElement find(By by) {
        return wait.until(visibilityOfElementLocated(by));
    }


}
