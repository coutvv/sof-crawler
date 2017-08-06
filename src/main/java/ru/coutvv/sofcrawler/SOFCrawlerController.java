package ru.coutvv.sofcrawler;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


/**
 * @author coutvv
 */
@RestController
public class SOFCrawlerController {

    private final String apiUrl = "http://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=%s&page=%d";

    private final CloseableHttpClient client = HttpClientBuilder.create().build();

    @RequestMapping("/sof-true-data")
    public String getTrueData(@RequestParam(value="title")String title, @RequestParam(value="page") int page) throws IOException {

        String reqURL = String.format(apiUrl, title, page);

        HttpGet request = new HttpGet(reqURL);
        String result = null;
        try(CloseableHttpResponse response = client.execute(request)) {
            System.out.println("Response Code : "
                    + response.getStatusLine().getStatusCode());
            result = EntityUtils.toString(response.getEntity(), "UTF-8");
        }
        return result;
    }

}
