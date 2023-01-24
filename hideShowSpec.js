function hideSpec(specName, resetValue) {
    if (resetValue) {
        jQuery('span[key="' + specName + '"] input').val('').trigger('input').trigger('change');
        jQuery('span[key="' + specName + '"] select').val('').trigger('change');
        jQuery('span[key="' + specName + '"] textarea').val('').trigger('change');
    }
    jQuery('span[key="' + specName + '"] select').parents().closest('.specificationList').hide();
    jQuery('span[key="' + specName + '"] input').parents().closest('.specificationList').hide();
    jQuery('span[key="' + specName + '"] textarea').parents().closest('.specificationList').hide();
}

function showSpec(specName) {
    jQuery('span[key="' + specName + '"] select').parents().closest('.specificationList').show();
    jQuery('span[key="' + specName + '"] input').parents().closest('.specificationList').show();
    jQuery('span[key="' + specName + '"] textarea').parents().closest('.specificationList').show();
} 