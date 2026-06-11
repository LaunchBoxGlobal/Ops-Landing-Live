export async function POST(request) {
  try {
    const body = await request.json();

    const ODOO_URL = process.env.ODOO_BASE_URL;
    const ODOO_API_KEY = process.env.ODOO_API_KEY;

    const description = `
<h3>Workflow Audit Request</h3>

<p><strong>Name:</strong> ${body?.firstName || ""} ${body?.lastName || ""}</p>
<p><strong>Email:</strong> ${body?.email || ""}</p>
<p><strong>Phone:</strong> ${body?.phoneNumber || ""}</p>
<p><strong>Company:</strong> ${body?.companyName || ""}</p>
<p><strong>Company Size:</strong> ${body?.companySize || ""}</p>

<h4>Current Tools</h4>
<p>${(body?.tools || []).join(", ") || "None specified"}</p>

<h4>Operational Problems</h4>
<ul>
  ${(body?.problems || []).map((p) => `<li>${p}</li>`).join("")}
</ul>

<h4>Solution Requirements</h4>
<p><strong>Solution Type:</strong> ${body?.solutionType || ""}</p>
<p><strong>Timeline:</strong> ${body?.timeline || ""}</p>
<p><strong>Budget:</strong> ${body?.budget || ""}</p>

<h4>Additional Notes</h4>
<p>${body?.notes || "None"}</p>
`;

    const leadResponse = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            "launch-box",
            2,
            ODOO_API_KEY,
            "crm.lead",
            "create",
            [
              {
                type: "lead",
                user_id: null,
                source_id: 19,
                campaign_id: 21,
                name: `${(body?.firstName || "") + " " + (body?.lastName || "")} - Operations Form`,
                email_from: body?.email || "",
                phone: body?.phoneNumber || "",
                partner_name: body?.companyName || "",
                description,
              },
            ],
          ],
        },
        id: 601,
      }),
    });

    const leadData = await leadResponse.json();

    if (leadData.error) {
      throw new Error(
        leadData.error?.data?.message || "Failed to create CRM lead",
      );
    }

    const leadId = leadData.result;
    const leadUrl = `https://launch-box.odoo.com/odoo/action-659/${leadId}`;

    const chatterResponse = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            "launch-box",
            2,
            ODOO_API_KEY,
            "discuss.channel",
            "message_post",
            [17],
            {
              body: `New workflow audit request from ${body?.firstName || ""} ${body?.lastName || ""} at ${body?.companyName || ""}\nURL: ${leadUrl}`,
              message_type: "comment",
              subtype_xmlid: "mail.mt_comment",
            },
          ],
        },
        id: 601,
      }),
    });

    const chatterData = await chatterResponse.json();

    if (chatterData.error) {
      console.error("Failed to post chatter message:", chatterData.error);
    }

    return Response.json({
      success: true,
      leadId,
    });
  } catch (error) {
    console.error("Odoo Lead Error:", error);

    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
