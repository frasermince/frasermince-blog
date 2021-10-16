const on_render_body = require("./on-render-body")
// @ponicode
describe("on_render_body", () => {
    test("0", () => {
        let callFunction = () => {
            on_render_body({ setHeadComponents: ["a1969970175", 987650, 12] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            on_render_body({ setHeadComponents: [12, "bc23a9d531064583ace8f67dad60f6bb", 987650] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            on_render_body({ setHeadComponents: [12345, 987650, 12] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            on_render_body({ setHeadComponents: [987650, 12345, 987650] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            on_render_body({ setHeadComponents: [12, 12345, 12345] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            on_render_body({ setHeadComponents: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
