module("parser");

test('CSSParser', function() {
    equals(typeof(YAECSS), "object", "Exists YAECSS namescape");
    equals(typeof(YAECSS.CSSParser), "function", "Exists YAECSS.CSSParser class");
});
