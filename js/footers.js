var footerBanner = {
    data: function() {
        return({"footers": coFootersConfig['powered-by']});
    },
    template: 
        `<div class="footer notprintable">
            <a v-for="f in footers" class="footer" v-bind:href="f.url"><img class="footer" v-bind:src="f.icon" v-bind:title="f.title"/></a>
        </div>`
};

var footers = new Vue({
    el: '#footers',
    components: {
        'footer-banner': footerBanner,
    },
});