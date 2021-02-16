var resources = new Vue({
    data: {
        resources: null
    },
    el: '#resources',
    mounted: function () {
        resourcesFile = "help/resources-resources.md";
        fetchMdData(resourcesFile).then(data => {
            this.resources = marked(data);
        });
    },
});