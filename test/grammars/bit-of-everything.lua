a = 'local,.' b, c = 2, 3
function func() return end
local function lclfunc() end
local d = true
local e, f = 5, 6
b, c = 1 == 2, nil
g = {}
g = { nil }
g = { h = 1, q = 2; o = 3 }
(g).h = 1
g.h.x['y'] = 8
g['h'] = 8
g().a = 1
i = display.BUTTONS_OK
j = function(a,b) end
k = l'blah'
k = l('blah')
l('blah')
l()
