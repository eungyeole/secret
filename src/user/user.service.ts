import { Injectable } from '@nestjs/common';
import { Builder,until,By,Key } from "selenium-webdriver"
interface data {
    name : string,
    server : string,
    job : string,
    level : string,
    exp : string,
    pop : string,
    guild : string,
    img : string,
}
async function startCrawl(query: string) : Promise<data>{
    let driver = await new Builder().forBrowser('chrome').build();  
    let data: data;
    try { 
        await driver.get("https://maplestory.nexon.com/Ranking/World/Total?c=" + query);  
        const Element = await driver.findElement(By.className("search_com_chk"));
        const dataElement = await Element.findElements(By.css("td"));
        const leftElement = dataElement[1];
        const img = await (await leftElement.findElement(By.css(".char_img > img"))).getAttribute("src");
        const job = await (await leftElement.findElement(By.css("dl > dd"))).getText();
        const name = await (await leftElement.findElement(By.css("dl > dt > a"))).getText();
        const server = await (await leftElement.findElement(By.css("dl > dt > a > img"))).getAttribute("src");
        const level = await dataElement[2].getText();
        const exp = await dataElement[3].getText();
        const pop = await dataElement[4].getText();
        const guild = await dataElement[5].getText();
        data = {
            name,
            server,
            job,
            level,
            exp,
            pop,
            guild,
            img
        }
    }
    finally {
        await driver.quit(); 
    }
    return data;
}
@Injectable()
export class UserService {
    constructor(){}
    async getInfo(query : string): Promise<data>{
        return await startCrawl(query);
    }
}
