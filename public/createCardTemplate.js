(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pokemonInfoCard'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <section class=\"pokemon\">\r\n        <div class=\"pokemon-sprite-front-container\">\r\n          <img class=\"sprite pokemon-sprite-front-img\" src=\"/frontSprites/"
    + alias4(((helper = (helper = lookupProperty(helpers,"pokedex_number") || (depth0 != null ? lookupProperty(depth0,"pokedex_number") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pokedex_number","hash":{},"data":data,"loc":{"start":{"line":3,"column":74},"end":{"line":3,"column":92}}}) : helper)))
    + ".png\">\r\n        </div>\r\n        <div class=\"pokemon-text\">\r\n          <p class=\"name\">\r\n            Name: "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":18},"end":{"line":7,"column":26}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat hp\">\r\n            HP: "
    + alias4(((helper = (helper = lookupProperty(helpers,"hp") || (depth0 != null ? lookupProperty(depth0,"hp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hp","hash":{},"data":data,"loc":{"start":{"line":10,"column":16},"end":{"line":10,"column":22}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat atk\">\r\n            ATK: "
    + alias4(((helper = (helper = lookupProperty(helpers,"attack") || (depth0 != null ? lookupProperty(depth0,"attack") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"attack","hash":{},"data":data,"loc":{"start":{"line":13,"column":17},"end":{"line":13,"column":27}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat hp\">\r\n            DEF: "
    + alias4(((helper = (helper = lookupProperty(helpers,"defense") || (depth0 != null ? lookupProperty(depth0,"defense") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"defense","hash":{},"data":data,"loc":{"start":{"line":16,"column":17},"end":{"line":16,"column":28}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat atk\">\r\n            SP_ATK: "
    + alias4(((helper = (helper = lookupProperty(helpers,"sp_attack") || (depth0 != null ? lookupProperty(depth0,"sp_attack") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sp_attack","hash":{},"data":data,"loc":{"start":{"line":19,"column":20},"end":{"line":19,"column":33}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat hp\">\r\n            SP_DEF: "
    + alias4(((helper = (helper = lookupProperty(helpers,"sp_defense") || (depth0 != null ? lookupProperty(depth0,"sp_defense") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sp_defense","hash":{},"data":data,"loc":{"start":{"line":22,"column":20},"end":{"line":22,"column":34}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"stat atk\">\r\n            SPD: "
    + alias4(((helper = (helper = lookupProperty(helpers,"speed") || (depth0 != null ? lookupProperty(depth0,"speed") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"speed","hash":{},"data":data,"loc":{"start":{"line":25,"column":17},"end":{"line":25,"column":26}}}) : helper)))
    + "\r\n          </p>\r\n          <p class=\"other-stats\">\r\n            Other stats:\r\n            <ol class=\"other-stats-list\">\r\n                <li class=\"first-stat\">Weight: "
    + alias4(((helper = (helper = lookupProperty(helpers,"weight_kg") || (depth0 != null ? lookupProperty(depth0,"weight_kg") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight_kg","hash":{},"data":data,"loc":{"start":{"line":30,"column":47},"end":{"line":30,"column":60}}}) : helper)))
    + "kg</li>\r\n                <li class=\"second-stat\">Japanese Name: "
    + alias4(((helper = (helper = lookupProperty(helpers,"japanese_name") || (depth0 != null ? lookupProperty(depth0,"japanese_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"japanese_name","hash":{},"data":data,"loc":{"start":{"line":31,"column":55},"end":{"line":31,"column":72}}}) : helper)))
    + "</li>\r\n                <li class=\"third-stat\">Generation: "
    + alias4(((helper = (helper = lookupProperty(helpers,"generation") || (depth0 != null ? lookupProperty(depth0,"generation") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"generation","hash":{},"data":data,"loc":{"start":{"line":32,"column":51},"end":{"line":32,"column":65}}}) : helper)))
    + "</li>\r\n            </ol>\r\n          </p>\r\n        </div>\r\n      </section>\r\n";
},"useData":true});
})();