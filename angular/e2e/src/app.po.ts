import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getProductBacklogNavigationItem(): ElementFinder {
    return element(by.css('mat-sidenav a:nth-child(1)'));
  }

  navigateToProductBacklog(): promise.Promise<void> {
    return this.getProductBacklogNavigationItem().click();
  }

  getProductBacklogItemNavigationItem(): ElementFinder {
    return element(by.css('mat-sidenav a:nth-child(2)'));
  }

  navigateToProductBacklogItem(): promise.Promise<void> {
    return this.getProductBacklogItemNavigationItem().click();
  }
}
