var way = {
    props: ['item'],
    template:
        `<div class="way">
             <div class="way-headers">
                <div class="way-name">{{ item.name }}</div>
                <img class= "way-image" v-bind:src="item.icon" v-bind:alt="item.name" v-bind:title="item.name"/>
             </div>     
             <div class="way-content">
                 <div class="way-full-description">{{ item['full-description'] }}</div>
             </div>
         </div>`
};