(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pokemonInfoCard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img class=\"sprite pokemon-sprite-front-img\" src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"front-sprite") || (depth0 != null ? lookupProperty(depth0,"front-sprite") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"front-sprite","hash":{},"data":data,"loc":{"start":{"line":4,"column":62},"end":{"line":4,"column":78}}}) : helper)))
    + "\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img class=\"sprite pokemon-sprite-front-img\" src=\"/frontSprites/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"pokedex_number") || (depth0 != null ? lookupProperty(depth0,"pokedex_number") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pokedex_number","hash":{},"data":data,"loc":{"start":{"line":6,"column":76},"end":{"line":6,"column":94}}}) : helper)))
    + ".png\">\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <section class=\"pokemon flexItem\">\r\n        <div class=\"pokemon-sprite-front-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"front-sprite") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":10},"end":{"line":7,"column":17}}})) != null ? stack1 : "")
    + "        </div>\r\n        <div class=\"pokemon-text\">\r\n          <p class=\"name\">\r\n            Name: "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":18},"end":{"line":11,"column":26}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"id\">\r\n            ID: "
    + alias4(((helper = (helper = lookupProperty(helpers,"pokedex_number") || (depth0 != null ? lookupProperty(depth0,"pokedex_number") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pokedex_number","hash":{},"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":14,"column":34}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat hp\">\r\n            HP: "
    + alias4(((helper = (helper = lookupProperty(helpers,"hp") || (depth0 != null ? lookupProperty(depth0,"hp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hp","hash":{},"data":data,"loc":{"start":{"line":17,"column":16},"end":{"line":17,"column":22}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat atk\">\r\n            ATK: "
    + alias4(((helper = (helper = lookupProperty(helpers,"attack") || (depth0 != null ? lookupProperty(depth0,"attack") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"attack","hash":{},"data":data,"loc":{"start":{"line":20,"column":17},"end":{"line":20,"column":27}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat hp\">\r\n            DEF: "
    + alias4(((helper = (helper = lookupProperty(helpers,"defense") || (depth0 != null ? lookupProperty(depth0,"defense") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"defense","hash":{},"data":data,"loc":{"start":{"line":23,"column":17},"end":{"line":23,"column":28}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat atk\">\r\n            SP_ATK: "
    + alias4(((helper = (helper = lookupProperty(helpers,"sp_attack") || (depth0 != null ? lookupProperty(depth0,"sp_attack") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sp_attack","hash":{},"data":data,"loc":{"start":{"line":26,"column":20},"end":{"line":26,"column":33}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat hp\">\r\n            SP_DEF: "
    + alias4(((helper = (helper = lookupProperty(helpers,"sp_defense") || (depth0 != null ? lookupProperty(depth0,"sp_defense") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sp_defense","hash":{},"data":data,"loc":{"start":{"line":29,"column":20},"end":{"line":29,"column":34}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat atk\">\r\n            SPD: "
    + alias4(((helper = (helper = lookupProperty(helpers,"speed") || (depth0 != null ? lookupProperty(depth0,"speed") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"speed","hash":{},"data":data,"loc":{"start":{"line":32,"column":17},"end":{"line":32,"column":26}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"other-stats\">\r\n            Other stats:\r\n            <ol class=\"other-stats-list\">\r\n                <li class=\"first-stat\">Weight: "
    + alias4(((helper = (helper = lookupProperty(helpers,"weight_kg") || (depth0 != null ? lookupProperty(depth0,"weight_kg") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight_kg","hash":{},"data":data,"loc":{"start":{"line":37,"column":47},"end":{"line":37,"column":60}}}) : helper)))
    + "kg</li>\r\n                <li class=\"second-stat\">Japanese Name: "
    + alias4(((helper = (helper = lookupProperty(helpers,"japanese_name") || (depth0 != null ? lookupProperty(depth0,"japanese_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"japanese_name","hash":{},"data":data,"loc":{"start":{"line":38,"column":55},"end":{"line":38,"column":72}}}) : helper)))
    + "</li>\r\n                <li class=\"third-stat\">Generation: "
    + alias4(((helper = (helper = lookupProperty(helpers,"generation") || (depth0 != null ? lookupProperty(depth0,"generation") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"generation","hash":{},"data":data,"loc":{"start":{"line":39,"column":51},"end":{"line":39,"column":65}}}) : helper)))
    + "</li>\r\n            </ol>\r\n          </p>\r\n        </div>\r\n      </section>\r\n";
},"useData":true});
})();