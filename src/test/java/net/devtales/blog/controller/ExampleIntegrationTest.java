package net.devtales.devtales.controller;


import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import net.devtales.blog.controler.IndexController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;


/**
 * Created by Daniel on 17/05/2017.
 */
@RunWith(SpringRunner.class)
@WebMvcTest(IndexController.class)
public class ExampleIntegrationTest {

    @Autowired
    private WebClient webClient;

    @Test
    public void exampleIntegrationTest() throws Exception {
        HtmlPage page = this.webClient.getPage("/");
        assertThat(page.getBody().getTextContent()).isEqualTo("Hello World");
    }
}
