function AutoInput(id, type, url, listLimit) {
    this.input = $(id);
    this.list = this.input.parentNode.getElementsByTagName('ul')[0];
    this.placeholder = this.input.parentNode.getElementsByTagName('label')[0];
    this.type = type;
    this.listLimit = listLimit;
    this.data = null;
    this.fileredData = null;
    this.error = false;
    
    var that = this;
    
    this.visibleHeight = function(){return document.documentElement.clientHeight};
    this.listTop = function(){return that.input.getBoundingClientRect().bottom};
    
    if(this.type == "autocomplite-input") {
        function onFocus(e) {
            if(!that.list.mousedownHappened) {
                that.input.select();
            }
            that.list.style.display = 'block';
            that.placeholder.classList.add('input-hint__hint-focused');
        }
        this.input.addEventListener('focus', onFocus);
        
        function onInput(e) {
            that.placeholder.style.display = e.target.value ? 'none' : 'block';
            that.input.classList.remove('input-hint__invalid');
            if(that.error) return;
            if(!e.target.value) {
                that.render();
                return;
            }
            if(!that.data) {
                that.render().loading();
                that.loadData(url);
                that.timer = that.timer || setTimeout(function run() {
                    if(that.error) {
                        clearInterval(that.timer);
                        that.render().error();
                        return null;
                    }
                    if(that.data) {
                        that.render().list();
                        return null;
                    }
                    setTimeout(run, 1000);
                }, 500);
                return;
            }
            that.render().list();
        }
        this.input.addEventListener('input', onInput);
    } else if(this.type == "autocomplite-select") {
        that.list.parentNode.classList.toggle('custom-select');

        function onFocus(e) {
            that.list.style.display = 'block';
            that.placeholder.classList.add('input-hint__hint-focused');

        
            if(that.error) {
                clearInterval(that.timer);
                that.render().error();
                return;
            }
            if(!that.list.mousedownHappened) {
                that.input.select();
            }
            
            if(!that.data) {
                that.render().loading();
                that.loadData(url);
                that.timer = that.timer || setTimeout(function run() {
                    if(that.error) {
                        that.render().error();
                        return null;
                    }
                    if(that.data) {
                        that.render().list();
                        return null;
                    }
                    setTimeout(run, 1000);
                }, 500);
            }
            that.list.classList[that.visibleHeight()-(that.listTop()+200)>0 ? 'remove' : 'add']('input-hint__dropdown-inverse');

        };
        this.input.addEventListener('focus', onFocus);
        
        function onInput(e) {
            that.input.classList.remove('input-hint__invalid');
            that.placeholder.style.display = e.target.value ? 'none' : 'block';
            if(!that.data) return;
            that.render().list();
        }
        this.input.addEventListener('input', onInput);

        function onWheel(e) {
            var delta = e.wheelDelta || -e.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 20;
            e.preventDefault();
        }
        if ('onwheel' in document) {// IE9+, FF17+, Ch31+
            this.list.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {// устаревший вариант события
            this.list.addEventListener("mousewheel", onWheel);
        } else {    // Firefox < 17
            this.list.addEventListener("MozMousePixelScroll", onWheel);
        }
        
    }

    this.list.mousedownHappened = false;
    function onMousedown(e) {
        that.list.mousedownHappened = true;
        if(e.target.getAttribute('data-city')) {
            that.inputValue = that.input.value = e.target.innerHTML;
            that.selectedCity = e.target.innerHTML;
            that.render();
        }
        if(e.target.getAttribute('data-refresh')) location.reload();
    }
    this.list.addEventListener('mousedown', onMousedown);
    
    function onBlur() {
        that.placeholder.style.display = that.input.value ? 'none' : 'block';
        that.placeholder.classList.remove('input-hint__hint-focused');
        if(that.list.mousedownHappened) {
            that.input.focus();
            that.list.mousedownHappened = false;
        } else {
            that.list.style.display = 'none';
        }
        
        if(!that.input.value) {
            that.input.className = "input-hint__input input-hint__invalid";
            that.valueNotFound = true;
            return;
        }
        
        that.filterCities(that.input.value);
        for(var i = 0; i < that.result.length; i++) {
            if (that.result[i].City == that.input.value) {
                that.valueNotFound = false;
                break;
            }
            that.valueNotFound = true;
        }
        that.input.className = that.valueNotFound ?  "input-hint__input input-hint__invalid" : "input-hint__input";
    
    };
    this.input.addEventListener('blur', onBlur);
    
    function onKeydown(e) {
        if(that.list.children.length==0 || that.list.lastChild.getAttribute('data-cities-error')) return;
        
        var listLength = that.list.children.length;
        if(that.list.lastChild.getAttribute('data-cities-count')) --listLength;
        if(that.list.lastChild.id == 'loadMore') --listLength;
        
        switch (e.keyCode) {
        
        case 38:
            if(that.list.children[that.active].getBoundingClientRect().top-20 < that.list.getBoundingClientRect().top) {
                that.list.scrollTop -= 100;
            }
            that.list.children[that.active].classList.toggle('selected');
            if(that.active == 0) {
                that.active = listLength;
                that.list.scrollTop = that.list.scrollHeight;;
            }
            that.list.children[--that.active].classList.toggle('selected');
            that.selectedCity = that.list.children[that.active].innerHTML;
            break;
            
        case 40:
            if(that.list.children[that.active].getBoundingClientRect().bottom+20 > that.list.getBoundingClientRect().bottom) {
                that.list.scrollTop += 100;
            }
            if(that.active == listLength-1) {
                that.list.children[that.active].classList.toggle('selected');
                that.active = 0;
                that.list.children[that.active].classList.toggle('selected');
                that.list.scrollTop = 0;
            } else {
                that.list.children[that.active].classList.toggle('selected');
                that.list.children[++that.active].classList.toggle('selected');
            }
            that.selectedCity = that.list.children[that.active].innerHTML;
            break;
        case 13:
            that.input.value = that.inputValue = that.selectedCity = that.list.children[that.active].innerHTML;
            that.render();
            break;
        case 27:
            e.preventDefault();
            that.list.style.display = 'none';
            break;
        default:
            return;
        }
    }
    this.input.addEventListener('keydown', onKeydown);
}


AutoInput.prototype.loadData = function(url) {
    var that = this;
    var result;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
    
        if (request.status != 200) {
            console.warn( request.status + ': ' + request.statusText );
            that.error = request.status;
        } else {
            try {
                result = JSON.parse(request.responseText);
            } catch (e) {
                that.error = e;
                console.warn( "Некорректный ответ " + e.message );
            }
            that.data = result;
        }
    };
};

AutoInput.prototype.filterCities = function(value) {
    var that = this;
    var rawList;
    
    if(!value) {
        rawList = that.data
    } else {
        rawList = that.data.filter(function(q) {
            return q.City.toLowerCase().indexOf(value.toLowerCase()) == 0;
        });
    }

    var map = rawList.map(function(e, i) {
      return { index: i, value: e.City.toLowerCase()};
    });
    
    map.sort(function(a, b) {
        if(a.value.indexOf('.') != -1) return 1;
        if(!isNaN(a.value[0])) return 1;
        return +(a.value > b.value) || +(a.value === b.value) - 1;
    });
    
    that.result = map.map(function(e) {
      return rawList[e.index];
    });
    
    that.valueNotFound = that.result.length ? false : true;
    return that.result;
};

AutoInput.prototype.render = function() {
    var that = this;
    
    while(that.list.firstChild) {
      that.list.removeChild(that.list.firstChild);
    }

    return {
        list: function(limit) {
            that.filterCities(that.input.value);
            var list;
            var listLength = that.result.length;
            
            clearTimeout(that.timer);
            
            if(!listLength) {
                var item = document.createElement('li');
                item.className = "tooltip-item tooltip-item__not-found";
                item.innerHTML = "Не найдено";
                item.setAttribute('data-cities-error', 'error');
                that.list.appendChild(item);
                that.list.classList.remove('select-hint__dropdown');
                return;
            }
            
            if(that.listLimit) {
                list = that.result.splice(0, that.listLimit);
            } else {
                list = that.result.splice(0, 50);
            }
            
            list.forEach(function(i, index) {
                var item = document.createElement('li');
                item.setAttribute('data-city', i.Id)
                item.innerHTML = i.City;
                that.list.appendChild(item);
                
                if(index==that.listLimit-1) {
                    console.log(index)
                    var item = document.createElement('li');
                    item.className = "tooltip-item tooltip-item__details"
                    item.innerHTML = 'Показано '+that.listLimit+' из '+ that.listLimit + listLength+' городов';
                    item.setAttribute('data-cities-count', that.listLimit)
                    that.list.appendChild(item);
                }
                
                if(index == 49) {
                    var item = document.createElement('li');
                    item.id = 'loadMore';
                    item.className = 'select-hint__dropdown-loadmore';
                    item.addEventListener('mousedown', loadMore);
                    item.innerHTML = 'Загрузить больше';
                    that.list.appendChild(item);
                }
            });

            if(list.length > 5) {
                that.list.classList.add('select-hint__dropdown');
            } else {
                that.list.classList.remove('select-hint__dropdown');
            }
            
            function loadMore(e) {
                list = that.result.splice(0, 50);
                
                list.forEach(function(i, index) {
                    var item = document.createElement('li');
                    item.setAttribute('data-city', i.Id)
                    item.innerHTML = i.City;
                    that.list.insertBefore(item, $('loadMore'));
                });
            }
            
            that.active = 0;
            that.selectedCity = that.list.firstChild.innerHTML;
            that.list.firstChild.classList.add('selected');
            
            that.list.classList[that.visibleHeight()-(that.listTop()+200)>0 ? 'remove' : 'add']('input-hint__dropdown-inverse');
        },
        loading: function() {
            var item = document.createElement('li');
            item.setAttribute('data-cities-error', 'error');
            item.className = "tooltip-item tooltip__loading";
            item.innerHTML = "Загрузка";
            that.list.appendChild(item);
            that.loaderOpen = true;
        },
        error: function() {
            var item = document.createElement('li');
            item.className = "tooltip-item tooltip-item__error";
            item.setAttribute('data-cities-error', 'error');
            var message = createElement('div');
            message.className = "tooltip-item__error-message";
            message.innerHTML = "Что-то пошло не так. Проверьте соединение с интернетом и попробуйте ещё раз";
            item.appendChild(message);
            var refresh = createElement('div');
            refresh.className = "tooltip-item__error-refresh";
            refresh.setAttribute('data-refresh', 'true');
            refresh.innerHTML="Обновить";
            item.appendChild(refresh);
            that.list.appendChild(item);
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    var autocomplite = new AutoInput('input', "autocomplite-input", "static/kladr.json", 5);
    var autoselect = new AutoInput('select', "autocomplite-select", "static/kladr.json");
});

function $(id) {
    return document.getElementById(id);
}

function createElement(tag) {
    return document.createElement(tag);
}