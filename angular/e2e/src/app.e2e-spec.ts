import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Angular App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a sidenav with two navigation item', () => {
    page.navigateTo();
    expect(page.getProductBacklogNavigationItem().getText()).toEqual('Product Backlog');
    expect(page.getProductBacklogItemNavigationItem().getText()).toEqual('Product Backlog Item');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
