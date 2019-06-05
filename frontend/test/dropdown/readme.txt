Original test for the dropdown directive.

The controller the page is tied to needs this code:

angular.extend($scope,{
    country : {
        id : '001',
        label : 'Country',
        values : ['India','USA'],
        value : null
    },
    state : {
        id : '002',
        label : 'State',
        values : [],
        value : null
    },
    area : {
        id : '003',
        label : 'Area',
        values : [],
        value : null
    }
});