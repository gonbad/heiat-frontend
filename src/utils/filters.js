import moment from 'moment-jalaali';
import persianjs from 'persianjs'
import Vue from 'vue';
import _ from 'lodash'
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
export function standardPersian(text) {
    return text.replaceAll('‌',' ');
}
Vue.filter('moment', date => date?moment(date, 'YYYY-MM-DD'):null);
Vue.filter('jalali', m => m?m.format('jYYYY/jM/jD'):null);
Vue.filter('pNumber', text => text?persianJs(text.toString()).englishNumber().toString():'');
Vue.filter('changeBraces', text => text.replace('{','(').replace('}',')'));
Vue.filter('newLine', text => text.replaceAll('\n','<br>'));
Vue.filter('sort', _.orderBy);
Vue.filter('filter', _.filter);
Vue.filter('map', _.map);
Vue.filter('highlight', (text,keyword,separate=false) => {
    let ans=text.replaceAll('\n','<br>');
    if(keyword && keyword.length>0){
        keyword=standardPersian(keyword);
        if(separate){
            let sp=keyword.split(' ');
            for(let part of sp){
                console.log(part);
                ans=ans.replaceAll(part,'<em>'+part+'</em>')
            }
        }else {
            ans=ans.replaceAll(keyword,'<em>'+keyword+'</em>');
        }
        return ans;
    }
    return ans;
});

