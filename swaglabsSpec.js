import swaglabsLoginPage from "../pages/swagLabsLoginPage.js";

describe ('Swag Labs tests', () => {
    beforeAll(async () => {
        await swaglabsLoginPage.goto();
    });

    it('should log in with standard user', async ()=> {
        var username = element(by.xpath("//input[@id='user-name']"));

        // Click on the element.

        await username.click();

        // Send keys to the element (usually an input).
        await username.sendKeys("standard_user");

        var password = element(by.xpath("//input[@id='password']"));

        // Click on the element.
        await password.click();

        // Send keys to the element (usually an input).
        await password.sendKeys("secret_sauce");

        var submitButton = element(by.xpath("//input[@id='login-button']"));

        await submitButton.click();

        const productsheader = element(by.xpath("//span[contains(text(),'Products')]"))
        expect(productsheader.getText()).toEqual('PRODUCTS')

     });

    it('should add an item to the cart', async () => {
        //Click the add to cart button
        var addToCartButton = element(by.id("add-to-cart-test.allthethings()-t-shirt-(red)"));
        
        await addToCartButton.click();

        //Click Cart Button icon
        var CartButton = element(by.id("shopping_cart_container"));
        await CartButton.click();
        
        //Verifies Page has text Your cart
        const productsheader = element(by.xpath("//span[contains(text(),'Your Cart')]"))
        expect(productsheader.getText()).toEqual('YOUR CART')

        //Verifies Inventory item is what was selected
        var inventoryItem = element(by.css('div.page_wrapper div.cart_contents_container div:nth-child(1) div.cart_list div.cart_item div.cart_item_label > div.inventory_item_desc:nth-child(2)'));
        expect(inventoryItem.getText()).toBe('This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.')
    });

    it('should have 6 items on the inventory page', async () => {
        //Get all product items available on page
         const products = element.all(by.xpath('//*[@class="inventory_item"]'));
         
         //checks if its equal to 6
         expect(products.length).toBe(6);

    });

    it('should complete the purchase process of an item from the inventory', async () => {
        //Click on Cart Icon 
        var CartButton = element(by.id("shopping_cart_container"));

        await CartButton.click();

        //Click on check out button
        var checkOut = await element(by.xpath("//button[@id='checkout']"));
        await checkOut.click();

        //Enter Firstname
        var firstName = await element(by.xpath("//input[@id='first-name']"));
        await firstName.clear();
        await firstName.click();
        await firstName.sendKeys("Ademola");

        //Enter Latname
        var lastName = await element(by.xpath("//input[@id='last-name']"));
        await lastName.clear();
        await lastName.click();
        await lastName.sendKeys("Adelekan");

        //Enter Zipcode
        var zipCode = await element(by.xpath("//input[@id='postal-code']"));
        await zipCode.clear();
        await zipCode.click();
        await zipCode.sendKeys("123456");

        //Click Continue Buttton
        var continueButton = await element(by.xpath("//input[@id='continue']"));
        await continueButton.click();

        //Click on finish button
        var finishButton = await element(by.xpath("//button[@id='finish']"));
        await finishButton.click();
        await browser.sleep(3000);

        //Checks that success message is displayed.
        expect(element(by.xpath("//h2[contains(text(),'THANK YOU FOR YOUR ORDER')]")).isDisplayed()).toBeTruthy();  

    });

    // BONUS tests! Not required for the automation challenge, but do these if you can.
    it('sort the inventory items by price, high-to-low', async () => {

        

    });

    it('sort the inventory items by name, Z-to-A', async () => {
    });


})
