module('Formats', {
    setup: function(){
        this.input = $('<input type="text">').appendTo('#qunit-fixture');
        this.date = UTCDate(2012, 2, 15, 0, 0, 0, 0); // March 15, 2012
    },
    teardown: function(){
        this.input.data('datepicker').picker.remove();
    }
});

test('d: Day of month, no leading zero.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yyyy-mm-d'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[2], '5');
});

test('dd: Day of month, leading zero.', function(){
    this.input
        .val('2012-03-5')
        .datepicker({format: 'yyyy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[2], '05');
});

test('D: Day of week, short.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yyyy-mm-dd-D'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[3], 'Mon');
});

test('DD: Day of week, long.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yyyy-mm-dd-DD'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[3], 'Monday');
});

test('m: Month, no leading zero.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yyyy-m-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], '3');
});

test('mm: Month, leading zero.', function(){
    this.input
        .val('2012-3-5')
        .datepicker({format: 'yyyy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], '03');
});

test('M: Month shortname.', function(){
    this.input
        .val('2012-Mar-05')
        .datepicker({format: 'yyyy-M-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], 'Mar');
});

test('M: Month shortname case insensitive.', function(){
    this.input
        .val('2012-MAR-05')
        .datepicker({format: 'yyyy-M-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], 'Mar');
});

test('MM: Month full name.', function(){
    this.input
        .val('2012-March-5')
        .datepicker({format: 'yyyy-MM-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], 'March');
});

test('M: Month fullname case insensitive.', function(){
    this.input
        .val('2012-MARCH-05')
        .datepicker({format: 'yyyy-MM-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], 'March');
});

test('yy: Year, two-digit.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[0], '12');
});

test('yyyy: Year, four-digit.', function(){
    this.input
        .val('2012-03-5')
        .datepicker({format: 'yyyy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[0], '2012');
});

test('dd-mm-yyyy: Regression: Prevent potential month overflow in small-to-large formats (Mar 31, 2012 -> Mar 01, 2012)', function(){
    this.input
        .val('31-03-2012')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '31-03-2012');
});

test('dd-mm-yyyy: Leap day', function(){
    this.input
        .val('29-02-2012')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '29-02-2012');
});

test('yyyy-mm-dd: Alternative format', function(){
    this.input
        .val('2012-02-12')
        .datepicker({format: 'yyyy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val(), '2012-02-12');
});

test('yyyy-MM-dd: Regression: Infinite loop when numbers used for month', function(){
    this.input
        .val('2012-02-12')
        .datepicker({format: 'yyyy-MM-dd'})
        .datepicker('setValue');
    equal(this.input.val(), '2012-February-12');
});

test('+1d: Tomorrow', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('+1d')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '16-03-2012');
}));

test('tomorrow (alias for +1d): Tomorrow', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('tomorrow')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '16-03-2012');
}));

test('-1d: Yesterday', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('-1d')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '14-03-2012');
}));

test('yesterday (alias for -1d): Yesterday', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('yesterday')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '14-03-2012');
}));

test('+1w: Next week', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('+1w')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '22-03-2012');
}));

test('-1w: Last week', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('-1w')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '08-03-2012');
}));

test('+1m: Next month', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('+1m')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-04-2012');
}));

test('-1m: Last month', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('-1m')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-02-2012');
}));

test('+1y: Next year', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('+1y')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-03-2013');
}));

test('-1y: Last year', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('-1y')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-03-2011');
}));

test('-1y +2m: Multiformat', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 2, 15).getTime();
    };
    this.input
        .val('-1y +2m')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-05-2011');
}));

test('Regression: End-of-month bug', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 4, 31).getTime();
    };
    this.input
        .val('29-02-2012')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '29-02-2012');
}));

test('Invalid formats are force-parsed into a valid date on tab', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 4, 31).getTime();
    };
    this.input
        .val('44-44-4444')
        .datepicker({format: 'yyyy-MM-dd'})
        .focus();

    this.input.trigger({
        type: 'keydown',
        keyCode: 9
    });

    equal(this.input.val(), '56-September-30');
}));

test('Trailing separators', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 4, 31).getTime();
    };
    this.input
        .val('29.02.2012.')
        .datepicker({format: 'dd.mm.yyyy.'})
        .datepicker('setValue');
    equal(this.input.val(), '29.02.2012.');
}));

test('Assume nearby year - last century', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 4, 31).getTime();
    };
    this.input
        .val('02/14/91')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/1991');
}));

test('Assume nearby year - this century (- 1 year)', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 4, 31).getTime();
    };
    this.input
        .val('02/14/01')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/2001');
}));

test('Assume nearby year - this century (+ 7 years)', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 4, 31).getTime();
    };
    this.input
        .val('02/14/19')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/2019');
}));

test('Assume nearby year - this century (+ 13 years)', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 4, 31).getTime();
    };
    this.input
        .val('02/14/23')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/1923');
}));

test('Assume nearby year - this century (+ 13 years, threshold = 30)', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2012, 4, 31).getTime();
    };
    this.input
        .val('02/14/23')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: 30})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/2023');
}));

test('afterInputChange is called with correct parameters when month is updated', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2024, 6, 6).getTime();
    };
    var updatedMonth = "2";
    var updatedMonth = "02";

    this.input
        .val(updatedMonth + '/10/2023')
        .datepicker({format: 'mm/dd/yyyy',
        afterInputChange: function(inputChange, dateOld, dateNew) {
            equal(inputChange, "mm", 'Month should be passed to afterInputChange');
            equal(dateOld, updatedMonth, 'Old month should be correctly passed to afterInputChange');
            equal(dateNew, updatedMonth, 'New month should be correctly passed to afterInputChange');
        }
        })
        .datepicker('setValue');
    equal(this.input.val(), '02/10/2023');
}));

test('afterInputChange is called with correct parameters when day is updated', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2024, 6, 6).getTime();
    };
    var originalDay = "Monday";
    var updatedDay = "06";

    this.input
        .val('02/' + originalDay + '/2023')
        .datepicker({format: 'mm/dd/yyyy',
        afterInputChange: function(inputChange, dateOld, dateNew) {
            equal(inputChange, "dd", 'Day should be passed to afterInputChange');
            equal(dateOld, originalDay, 'Old day should be correctly passed to afterInputChange');
            equal(dateNew, updatedDay, 'New day should be correctly passed to afterInputChange');
        }
        })
        .datepicker('setValue');
    equal(this.input.val(), '02/06/2023');
}));

test('afterInputChange is called with correct parameters when two digit year is updated', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2024, 6, 6).getTime();
    };
    var originalYear = "24";
    var updatedYear = "2024";

    this.input
        .val('02/06/' + originalYear)
        .datepicker({format: 'mm/dd/yyyy',
        assumeNearbyYear: true,
        afterInputChange: function(inputChange, dateOld, dateNew) {
            equal(inputChange, "yyyy", 'Day should be passed to afterInputChange');
            equal(dateOld, originalYear, 'Old day should be correctly passed to afterInputChange');
            equal(dateNew, updatedYear, 'New day should be correctly passed to afterInputChange');
        }
        })
        .datepicker('setValue');
    equal(this.input.val(), '02/06/2024');
test('Convert month `February` to number `02`, monthNameToNumber === true', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2024, 6, 6).getTime();
    };
    this.input
        .val('February/14/2023')
        .datepicker({format: 'mm/dd/yyyy', monthNameToNumber: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/2023');
}));

test('Convert month `Dec` to number `12`, monthNameToNumber === true', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2024, 6, 6).getTime();
    };
    this.input
        .val('Dec/14/2023')
        .datepicker({format: 'mm/dd/yyyy', monthNameToNumber: true})
        .datepicker('setValue');
    equal(this.input.val(), '12/14/2023');
}));

test('Non existing moth word could not be converted to number, defaults to current month monthNameToNumber === true', patch_date(function(Date){
    Date.now = function(){
        return UTCDate(2024, 6, 6).getTime();
    };
    this.input
        .val('Nonsense/14/2023')
        .datepicker({format: 'mm/dd/yyyy', monthNameToNumber: true})
        .datepicker('setValue');
    equal(this.input.val(), '07/14/2023');
}));