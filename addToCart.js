function addToCart(productId, quantity, ManagingOrganizationId, CurrentPurchasingOrganizationId, CurrentUserProfileId) {
    fetch("https://marketflux-pilot.foundrycommerce.com/product/addalltocart", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrer": "https://marketflux-pilot.foundrycommerce.com/product/" + productId,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"AddToCartParms\":[{\"Id\":\""+ 
      productId + "\",\"Name\":\"Ladies' NIKE Golf Micro Pique Sport Shirt\",\"Qty\":\"" + 
      quantity + "\",\"Specifications\":[],\"IsGlobal\":false,\"Key\":\"Shipping\",\"Label\":\"shipping\",\"Prefix\":null,\"SaveWithVersion\":false,\"Suffix\":null,\"Type\":8}],\"CustomFields\":[],\"AssociatedSavedVersionId\":null,\"OverrideVariantId\":\"2c42c106-8aca-e511-80cb-0025907fdf4b\",\"OrderLineFulfillmentType\":0,\"UpsertCart\":false}],\"" +
      "Context\":{\"CurrentManagingOrganizationId\":\"" + 
      ManagingOrganizationId + "\",\"CurrentPurchasingOrganizationId\":\"" + 
      CurrentPurchasingOrganizationId+ "\",\"CurrentSupplyingOrganizationId\":null,\"CurrentUserProfileId\":\""+ 
      CurrentUserProfileId +"\",\"CurrentMarketFluxDeploymentId\":null,\"CurrentLogonLinkId\":null,\"CurrentEditingDisabled\":false}}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(function(data) {
        console.log("Add To Cart Results:");
        console.log(data);
    });
}