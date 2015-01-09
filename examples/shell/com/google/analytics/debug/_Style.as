﻿package com.google.analytics.debug
{
    import flash.net.*;
    import flash.text.*;

    public class _Style extends Object
    {
        public var failureColor:uint;
        public var borderColor:uint;
        public var backgroundColor:uint;
        private var _sheet:StyleSheet;
        public var roundedCorner:uint;
        public var warningColor:uint;
        public var infoColor:uint;
        public var alertColor:uint;
        public var successColor:uint;
        private var _loader:URLLoader;
        private var _defaultSheet:String;

        public function _Style()
        {
            _sheet = new StyleSheet();
            _loader = new URLLoader();
            _init();
            return;
        }// end function

        private function _parseSheet(param1:String) : void
        {
            _sheet.parseCSS(param1);
            return;
        }// end function

        public function get sheet() : StyleSheet
        {
            return _sheet;
        }// end function

        private function _init() : void
        {
            _defaultSheet = "";
            _defaultSheet = _defaultSheet + "a{text-decoration: underline;}\n";
            _defaultSheet = _defaultSheet + ".uiLabel{color: #000000;font-family: Arial;font-size: 12;margin-left: 2;margin-right: 2;}\n";
            _defaultSheet = _defaultSheet + ".uiWarning{color: #ffffff;font-family: Arial;font-size: 14;font-weight: bold;margin-left: 6;margin-right: 6;}\n";
            _defaultSheet = _defaultSheet + ".uiAlert{color: #ffffff;font-family: Arial;font-size: 14;font-weight: bold;margin-left: 6;margin-right: 6;}\n";
            _defaultSheet = _defaultSheet + ".uiInfo{color: #000000;font-family: Arial;font-size: 14;font-weight: bold;margin-left: 6;margin-right: 6;}\n";
            _defaultSheet = _defaultSheet + ".uiSuccess{color: #ffffff;font-family: Arial;font-size: 12;font-weight: bold;margin-left: 6;margin-right: 6;}\n";
            _defaultSheet = _defaultSheet + ".uiFailure{color: #ffffff;font-family: Arial;font-size: 12;font-weight: bold;margin-left: 6;margin-right: 6;}\n";
            _defaultSheet = _defaultSheet + ".uiAlertAction{color: #ffffff;text-align: center;font-family: Arial;font-size: 12;font-weight: bold;margin-left: 6;margin-right: 6;}\n";
            _defaultSheet = _defaultSheet + ".uiAlertTitle{color: #ffffff;font-family: Arial;font-size: 16;font-weight: bold;margin-left: 6;margin-right: 6;}\n";
            _defaultSheet = _defaultSheet + "\n";
            roundedCorner = 6;
            backgroundColor = 13421772;
            borderColor = 5592405;
            infoColor = 16777113;
            alertColor = 16763904;
            warningColor = 13369344;
            successColor = 65280;
            failureColor = 16711680;
            _parseSheet(_defaultSheet);
            return;
        }// end function

    }
}
