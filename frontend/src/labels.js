export const statusLabels = {
    'InProgress': 'İşlemde',
    'Completed': 'Tamamlandı',
    'Pending': 'Beklemede',
};

export const priorityLabels = {
    'Low': 'Düşük',
    'Medium': 'Orta',
    'High': 'Yüksek',
};

export const departmentLabels = {
    it: 'IT',
    hr: 'İK',
    finance: 'Finans',
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const CurrentUser = "İlayda Sokur"
export const CurrentUserDepartment = "HR"
