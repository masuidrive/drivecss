module("parser");

test('CSSParser', function() {
    equals(typeof(DriveCSS), "object", "Exists DriveCSS namescape");
    equals(typeof(DriveCSS.CSSParser), "function", "Exists DriveCSS.CSSParser class");
});
