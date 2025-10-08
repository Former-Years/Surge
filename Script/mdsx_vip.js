// Surge MITM Script for unlocking VIP in tesla.touping.vip member info
// Usage: Add to Surge config: [MITM] & [Script] sections

function main() {
    const response = $response;
    if (response && response.body) {
        try {
            const body = JSON.parse(response.body);
            
            // Check if it's the member info response
            if (body && body.data && body.data.member) {
                const member = body.data.member;
                
                // Unlock VIP
                member.vip = 1;
                member.vip_expiration_date = "2099-12-31";
                member.vip_free = 1; // If applicable, enable free VIP
                member.is_sub = 1;
                member.is_sub1 = 1;
                member.point = 999999; // Bonus points if needed
                member.send_mileage = 999999; // Unlimited mileage
                
                // Optional: Modify other fields for full unlock
                // member.price = 0;
                // member.price1 = 0;
                
                // Reconstruct the response
                response.body = JSON.stringify(body);
            }
        } catch (e) {
            console.log("Error parsing JSON: " + e);
        }
    }
    
    $done(response);
}
