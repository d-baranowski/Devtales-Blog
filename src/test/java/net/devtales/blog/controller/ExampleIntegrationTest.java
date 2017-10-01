package net.devtales.blog.controller;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@WebMvcTest()
public class ExampleIntegrationTest {
    private static WebDriver chromeDriver;

    @Test
    public void exampleIntegrationTest() throws Exception {
        ChromeOptions options = new ChromeOptions();
        options.setBinary(ExampleIntegrationTest.class.getClass().getResource("chromedriver.exe").getPath());
        chromeDriver = new ChromeDriver(options);
        chromeDriver.get("http://localhost:8080");
    }
}
