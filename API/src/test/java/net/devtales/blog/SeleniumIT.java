package net.devtales.blog;

import io.github.bonigarcia.wdm.WebDriverManager;
import net.devtales.blog.service.ArticlesService;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
    private WebDriverWait wait = new WebDriverWait(webDriver, 20);

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

    @Test
    public void canCreateAnArticle() {
        webDriver.get("http://localhost:" + port + "/admin");

        // Login
        WebElement inputUsername = find(By.cssSelector("input[name=username]"));
        assertTrue(inputUsername.isDisplayed());

        WebElement inputPassword = find(By.cssSelector("input[name=password]"));
        assertTrue(inputPassword.isDisplayed());

        inputUsername.sendKeys("admin");
        inputPassword.sendKeys("password");

        WebElement submitBtn = find(By.cssSelector("button[type=submit]"));
        submitBtn.click();

        //
        WebElement draftEditor = find(By.className("public-DraftEditor-content"));
        WebElement h1Btn = find(By.cssSelector("#content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"));
        WebElement summaryBtn = find(By.cssSelector("#content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(10)"));
        WebElement codeBtn = find(By.cssSelector("#content > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(11)"));
        WebElement saveBtn = find(By.id("save-button"));

        h1Btn.click();
        draftEditor.sendKeys("Hello World this is a selenium test", Keys.ENTER);
        summaryBtn.click();

        draftEditor.sendKeys(prependWithArrowsDown("To summarise this is a simple wysqig test to check if my article can be created" +
                " I hope that I'll be able to do this sort of test with selenium without too much trouble.", Keys.ENTER));
        summaryBtn.click();

        draftEditor.sendKeys(prependWithArrowsDown(Keys.ENTER,Keys.ENTER));
        codeBtn.click();
        draftEditor.sendKeys(prependWithArrowsDown("// javascript //", Keys.ENTER));
        draftEditor.sendKeys(prependWithArrowsDown("function helloWorld() {", Keys.ENTER));
        draftEditor.sendKeys(prependWithArrowsDown(Keys.TAB));
        draftEditor.sendKeys(prependWithArrowsDown("console.log('Hello World!')", Keys.ENTER));
        draftEditor.sendKeys(prependWithArrowsDown("}"));
        saveBtn.click();
        WebElement succes = find(By.className("notification-success"));
        assertTrue(succes.isDisplayed());
    }

    private CharSequence[] prependWithArrowsDown(CharSequence... keys) {
        final CharSequence[] moveDown = new CharSequence[99];
        Arrays.fill(moveDown, Keys.ARROW_DOWN);
        final CharSequence[] result = new CharSequence[moveDown.length + keys.length];
        System.arraycopy(moveDown, 0, result, 0, moveDown.length);
        System.arraycopy(keys, 0, result, moveDown.length, keys.length);
        return result;
    }

    private WebElement find(By by) {
        return wait.until(visibilityOfElementLocated(by));
    }


}
