package net.devtales.blog;

import io.github.bonigarcia.wdm.ChromeDriverManager;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.service.ArticlesService;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.openqa.selenium.Keys.ENTER;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = DevtalesApplication.class)
@ActiveProfiles("ci")
@AutoConfigureMockMvc
public class HackItDude {
    private WebDriver webDriver = new ChromeDriver();
    private WebDriverWait wait = new WebDriverWait(webDriver, 15);

    @BeforeClass
    public static void setup() {
        ChromeDriverManager.getInstance().setup();
    }

    @LocalServerPort
    private int port;

    @Autowired
    ArticlesService articlesService;

    @Test
    @Transactional
    public void hacItLikeThereIsNoTommorow() {
        webDriver.get("http://admin:adsadsadsads@localhost:" + port + "/admin");

        WebElement H1Btn = find(By.xpath("//*[@id=\"content\"]/div/div[1]/div[1]"));
        WebElement BoldBtn = find(By.xpath("//*[@id=\"content\"]/div/div[2]/div[1]"));
        WebElement ItalicBtn = find(By.xpath("//*[@id=\"content\"]/div/div[2]/div[2]"));
        WebElement SummaryBtn = find(By.xpath("//*[@id=\"content\"]/div/div[1]/div[10]"));
        WebElement UlBtn = find(By.xpath("//*[@id=\"content\"]/div/div[1]/div[8]"));
        WebElement saveBtn = find(By.xpath("//*[@id=\"content\"]/div/button"));

        //H1Btn.click();
        type("Welcome to Devtales" + ENTER + ENTER +
                "This is the first line of the summary." + ENTER +
                "This should be bold on the second line of summary." + ENTER +
                "This should be italic on third line of summary." + ENTER + ENTER +
                "This is the body: " + ENTER +
                "This is list no 1 " + ENTER +
                "This is list no 2 " + ENTER +
                "This is list no 3 " + ENTER +
                "This is list no 4 " + ENTER +
                "#test1 #test2 #test3 #test4");

        selectElement(By.xpath("//*[@id=\"content\"]/div/div[3]/div/div/div/div/div/div[1]/div/span/span"));
        H1Btn.click();
        selectElement(By.xpath("//*[@id=\"content\"]/div/div[3]/div/div/div/div/div/div[2]/div/span/span"));
        SummaryBtn.click();
        selectElement(By.xpath("//*[@id=\"content\"]/div/div[3]/div/div/div/div/div/div[3]/div/span/span"));
        SummaryBtn.click();
        BoldBtn.click();
        selectElement(By.xpath("//*[@id=\"content\"]/div/div[3]/div/div/div/div/div/div[4]/div/span/span"));
        SummaryBtn.click();
        ItalicBtn.click();

        Actions action = new Actions(webDriver);
        WebElement element = find(By.xpath("//*[@id=\"content\"]/div/div[3]/div/div/div/div/div/div[7]/div/span/span"));
        action.moveToElement(element, 0, 0)
                .clickAndHold()
                .moveByOffset(element.getSize().getWidth(), element.getSize().getHeight() * 4)
                .release()
                .perform();

        UlBtn.click();

        saveBtn.click();

        List<Article> myVar = articlesService.getAllArticles();
        webDriver.close();
    }

    private void type(CharSequence content) {
        find(By.cssSelector("#content > div > div.middle-section > div > div")).click();
        Actions action = new Actions(webDriver);
        action.sendKeys(content);
        action.perform();
    }

    private WebElement find(By by) {
        return wait.until(visibilityOfElementLocated(by));
    }

    private void selectElement(By by) {
        Actions action = new Actions(webDriver);
        WebElement element = find(by);
        action.moveToElement(element, 0, 0)
                .clickAndHold()
                .moveByOffset(element.getSize().getWidth(), 0)
                .release()
                .perform();

    }
}
