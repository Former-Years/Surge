// Surge MITM Script for unlocking VIP in tesla.touping.vip (Optimized Version)
function main() {
    const response = $response;
    console.log("=== Debug: Script triggered at " + new Date().toISOString() + " ===");

    if (response && response.body) {
        try {
            console.log("Debug: Received body length: " + response.body.length);
            const body = JSON.parse(response.body);

            if (body && body.data && body.data.member) {
                const member = body.data.member;
                console.log("Debug: Original expiration: " + member.vip_expiration_date);

                // Unlock VIP
                member.vip = 1;
                member.vip_expiration_date = "2099-12-31";
                member.vip_free = 1;
                member.is_sub = 1;
                member.is_sub1 = 1;

                response.body = JSON.stringify(body);
                console.log("Debug: Modified expiration: " + member.vip_expiration_date);
                console.log("Debug: New body length: " + response.body.length);
            } else {
                console.log("Debug: No member data found");
            }
        } catch (e) {
            console.log("Debug: JSON parse error: " + e.message);
        }
    } else {
        console.log("Debug: No response body");
    }

    $done(response);
}
