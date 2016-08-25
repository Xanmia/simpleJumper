var tween = (function () {

    function tweenTo(_object, _element, _duration, _repeat) {
        var count = 0;
        var ele = {};
        var org = {};
        var diff = _element.x - _object.x;
        for (ob in _element) {
            ele[ob] = (_element[ob] - _object[ob]) / _duration; 
            org[ob] =  (_element[ob] - _object[ob]);
        }

        requestAnimationFrame(tween);

        function tween() {
            var cont = false;
            for (ob in ele) {
                var test =(ele[ob] > 0 && _object[ob] < _element[ob]) ;
                if ((ele[ob] > 0 && _object[ob] < _element[ob]) || (ele[ob] < 0 && _object[ob] > _element[ob] )) {
                    _object[ob] += ele[ob];
                    cont = true;
                }

            }
            if (!cont && _repeat > count) {
                for (ob in ele) {
                    org[ob] *= -1;
                    _element[ob] += org[ob];
                    ele[ob] *= -1;
                }
                cont = true;
                count++;
            }

            if (cont) { requestAnimationFrame(tween); }

        }
    }

    return {
        to: function (_object, _element, _duration, _repeat) {
            tweenTo(_object, _element, _duration, _repeat);
        }
    };
})();