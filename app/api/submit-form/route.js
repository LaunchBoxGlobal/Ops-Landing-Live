export async function POST(request) {
  try {
    const body = await request.json();

    const ODOO_URL = process.env.ODOO_BASE_URL;
    const ODOO_API_KEY = process.env.ODOO_API_KEY;

    const description = `
<h3>New Website Lead</h3>

<p><strong>Name:</strong> ${body?.firstName || ""}</p>
<p><strong>Email:</strong> ${body?.email || ""}</p>
<p><strong>Phone:</strong> ${body?.phoneNumber || ""}</p>
<p><strong>Service:</strong> ${body?.service || ""}</p>

<h4>Message</h4>
<p>${body?.message || ""}</p>

<h4>Description</h4>
<p>${body?.description || ""}</p>

<h4>Source</h4>
<p>${body?.pageUrl || ""}</p>

<p><strong>Agreed To Terms:</strong> ${
      body?.agreeToTermsConditions ? "Yes" : "No"
    }</p>
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
                name: `${body?.firstName + " - Website Form" || "Unknown"}`,
                email_from: body?.email || "",
                phone: body?.phoneNumber || "",
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
            // [leadId],
            [17],
            {
              body: `New lead from Website\n${body?.firstName}\nURL: ${leadUrl}`,
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
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
