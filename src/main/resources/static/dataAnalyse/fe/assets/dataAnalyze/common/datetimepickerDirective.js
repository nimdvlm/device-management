
define(function (require) {
    require('css!common/datetimepicker/jquery.datetimepicker.css');
    require('common/datetimepicker/jquery.datetimepicker');
    return {
        name: 'datetimepicker',
        func: function () {
            return {
                scope: {
                    option: '=',
                    mindate: '=',
                    maxdate: '='
                },
                restrict: 'EA',
                require : '?ngModel',
                link: function ($scope, element, attrs, ctrl) {
                    $(function () {
                        $scope.option = $scope.option || {format: 'yyyy-MM-dd HH:mm:ss'};
                        $.datetimepicker.setLocale('zh');
                        var dateFormater = $.datetimepicker.getDateFormatter();
                        var isEqual = function (date1, date2) {
                            var str1 = dateFormater.formatDate(date1, $scope.option.format);
                            var str2 = dateFormater.formatDate(date2, $scope.option.format);
                            return str2 === str1;
                        };
                        $scope.$watch('option', function (newVal, oldVal) {
                            newVal.onClose = function (date) {
                                $scope.$apply(function () {
                                    if (!isEqual(ctrl.$modelValue, date)) {
                                        ctrl.$setViewValue(date);
                                    }
                                });
                            };
                            if (newVal) {
                                if (ctrl.$modelValue) {
                                    if (angular.isString(ctrl.$modelValue)) {
                                        ctrl.$modelValue = new Date(ctrl.$modelValue);
                                    }
                                    newVal.value = new Date(ctrl.$modelValue.getTime());
                                }
                                $scope.datetimepicker = $(element).datetimepicker($scope.option);
                            }
                        });
                        ctrl.$render = function () {
                            if ($scope.datetimepicker) {
                                $scope.datetimepicker.data('xdsoft_datetimepicker').setOptions({
                                    value: angular.isString(ctrl.$viewValue) ? new Date(ctrl.$viewValue) : ctrl.$viewValue
                                });
                            }
                        };
                        $scope.$watch('mindate', function (newVal, oldVal) {
                            if (newVal && $scope.datetimepicker.data('xdsoft_datetimepicker')) {
                                $scope.datetimepicker.data('xdsoft_datetimepicker').setOptions({
                                    minDate: newVal
                                });
                            }
                        });
                        $scope.$watch('maxdate', function (newVal, oldVal) {
                            if (newVal && $scope.datetimepicker.data('xdsoft_datetimepicker')) {
                                $scope.datetimepicker.data('xdsoft_datetimepicker').setOptions({
                                    maxDate: newVal
                                });
                            }
                        });
                        $scope.$watch('mintime', function (newVal, oldVal) {
                            if (newVal && $scope.datetimepicker.data('xdsoft_datetimepicker')) {
                                $scope.datetimepicker.data('xdsoft_datetimepicker').setOptions({
                                    minTime: newVal
                                });
                            }
                        });
                        $scope.$watch('maxtime', function (newVal, oldVal) {
                            if (newVal && $scope.datetimepicker.data('xdsoft_datetimepicker')) {
                                $scope.datetimepicker.data('xdsoft_datetimepicker').setOptions({
                                    maxTime: newVal
                                });
                            }
                        });
                    });
                }
            }
        }
    };
});
