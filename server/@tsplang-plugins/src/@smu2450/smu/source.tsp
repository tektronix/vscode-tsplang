require("../smu.tsp")

smu.source = {
    --[[[
        Get or set the active source function to {smu.FUNC_DC_CURRENT} or
        {smu.FUNC_DC_VOLTAGE}.

        When the active source function is changed, settings that are retained
        on a per-function basis are also changed.

        @type {TODO}
    ]]
    func = smu.FUNC_DC_CURRENT
}
