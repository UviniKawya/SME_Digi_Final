const BASE_URL = "http://localhost/SME_Digi_Final/backend/api";
async function request(endpoint, options={}) {
  const headers = {"Content-Type":"application/json", ...(options.headers||{})};
  const res = await fetch(`${BASE_URL}/${endpoint}`, {...options, headers, credentials:'include'});
  const data = await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}
export const api = {
  smeRegister:d=>request('sme_register.php',{method:'POST',body:JSON.stringify(d)}),
  smeLogin:d=>request('sme_login.php',{method:'POST',body:JSON.stringify(d)}),
  adminRegister:d=>request('admin_register.php',{method:'POST',body:JSON.stringify(d)}),
  adminLogin:d=>request('admin_login.php',{method:'POST',body:JSON.stringify(d)}),
  logout:()=>request('logout.php',{method:'POST'}),
  profile:()=>request('profile.php'),
  updateProfile:d=>request('profile.php',{method:'PUT',body:JSON.stringify(d)}),
  getQuestions:type=>request(`get_questions.php?assessment_type=${encodeURIComponent(type)}`),
  submitAssessment:(assessment_type,answers)=>request('submit_assessment.php',{method:'POST',body:JSON.stringify({assessment_type,answers})}),
  history:()=>request('assessment_history.php'),
  recommendations:()=>request('recommendations.php'),
  dashboard:()=>request('dashboard.php'),
  getInventory:()=>request('inventory.php'), addInventory:d=>request('inventory.php',{method:'POST',body:JSON.stringify(d)}), updateInventory:d=>request('inventory.php',{method:'PUT',body:JSON.stringify(d)}), deleteInventory:id=>request(`inventory.php?id=${id}`,{method:'DELETE'}),
  getSales:()=>request('sales.php'), addSale:d=>request('sales.php',{method:'POST',body:JSON.stringify(d)}), deleteSale:id=>request(`sales.php?id=${id}`,{method:'DELETE'}),
  adminDashboard:()=>request('admin_dashboard.php'), adminSmes:()=>request('admin_smes.php'), adminResults:smeId=>request(`admin_results.php${smeId?`?sme_id=${smeId}`:''}`)
};
