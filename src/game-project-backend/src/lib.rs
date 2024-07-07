use std::cell::RefCell;

thread_local! {
    static LOGINS: RefCell<Vec<String>> = RefCell::default(); 
    static PASSWORDS: RefCell<Vec<String>> = RefCell::default(); 
    static GOLD_POUCHES: RefCell<Vec<i32>> = RefCell::default(); 
    static USER_POWERS: RefCell<Vec<i32>> = RefCell::default(); 
    static USER_PORTRAIT: RefCell<Vec<i32>> = RefCell::default(); 
    static USER_CAVE_FLOOR: RefCell<Vec<i32>> = RefCell::default(); 
    static USER_FOREST_FLOOR: RefCell<Vec<i32>> = RefCell::default(); 
    static USER_EXPERIENCE: RefCell<Vec<i32>> = RefCell::default(); 
    static USER_HEALTH: RefCell<Vec<i32>> = RefCell::default(); 
}

#[ic_cdk::update]
fn add_user(login: String, password: String, gold: i32, power: i32) {
    LOGINS.with(|logins| {
        logins.borrow_mut().push(login);
    });
    
    PASSWORDS.with(|passwords| {
        passwords.borrow_mut().push(password);
    });

    GOLD_POUCHES.with(|gold_cell| {
        gold_cell.borrow_mut().push(gold);
    });

    USER_POWERS.with(|powers_cell| {
        powers_cell.borrow_mut().push(power);
    });

    USER_PORTRAIT.with(|powers_cell| {
        powers_cell.borrow_mut().push(0);
    });
    USER_CAVE_FLOOR.with(|powers_cell| {
        powers_cell.borrow_mut().push(1);
    });
    USER_FOREST_FLOOR.with(|powers_cell| {
        powers_cell.borrow_mut().push(1);
    });
    USER_EXPERIENCE.with(|powers_cell| {
        powers_cell.borrow_mut().push(0);
    });
    USER_HEALTH.with(|powers_cell| {
        powers_cell.borrow_mut().push(34);
    });
}

#[ic_cdk::query]
fn read_logins() -> Vec<String>{
    LOGINS.with(|logins: &RefCell<Vec<String>>| {
        logins.borrow().clone()
    })
}
#[ic_cdk::query]
fn read_passwords() -> Vec<String>{
    PASSWORDS.with(|passwords: &RefCell<Vec<String>>| {
        passwords.borrow().clone()
    })
}
#[ic_cdk::query]
fn read_gold() -> Vec<i32>{
    GOLD_POUCHES.with(|gold: &RefCell<Vec<i32>>| {
        gold.borrow().clone()
    })
}
#[ic_cdk::query]
fn read_power() -> Vec<i32>{
    USER_POWERS.with(|power: &RefCell<Vec<i32>>| {
        power.borrow().clone()
    })
}
#[ic_cdk::query]
fn get_gold_at_index(index: i32) -> i32 {
    GOLD_POUCHES.with(|gold_pouches| {
        let gold_pouches_borrow = gold_pouches.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(gold) = gold_pouches_borrow.get(idx) {
                return *gold;
            }
        }
        0 // Return 0 if index is out of bounds
    })
}

#[ic_cdk::query]
fn get_power_at_index(index: i32) -> i32 {
    USER_POWERS.with(|user_powers| {
        let user_powers_borrow = user_powers.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(power) = user_powers_borrow.get(idx) {
                return *power;
            }
        }
        0 // Return 0 if index is out of bounds
    })
}
#[ic_cdk::query]
fn find_login_index(login: String) -> i32 {
    LOGINS.with(|logins| {
        match logins.borrow().iter().position(|item| item == &login) {
            Some(index) => index as i32,
            None => -1,
        }
    })
}
#[ic_cdk::query]
fn get_password_at_index(index: i32) -> String {
    PASSWORDS.with(|passwords| {
        let passwords_borrow = passwords.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(password) = passwords_borrow.get(idx) {
                return password.clone();
            }
        }
        String::new() // Return empty string if index is out of bounds
    })
}
#[ic_cdk::query]
fn compare_password_at_index(index: i32, password: String) -> bool {
    PASSWORDS.with(|passwords| {
        let passwords_borrow = passwords.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(stored_password) = passwords_borrow.get(idx) {
                return stored_password == &password;
            }
        }
        false
    })
}
#[ic_cdk::query]
fn find_login_and_compare_password(login: String, password: String) -> bool {
    let mut result = false;
    
    LOGINS.with(|logins| {
        let logins_borrow = logins.borrow();
        if let Some(index) = logins_borrow.iter().position(|item| item == &login) {
            PASSWORDS.with(|passwords| {
                let passwords_borrow = passwords.borrow();
                if let Some(stored_password) = passwords_borrow.get(index) {
                    result = stored_password == &password;
                }
            });
        }
    });

    result
}

#[ic_cdk::update]
fn update_user_portrait(index: i32, number: i32) {
    USER_PORTRAIT.with(|user_portrait| {
        let mut user_portrait_borrow = user_portrait.borrow_mut();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if idx < user_portrait_borrow.len() {
                user_portrait_borrow[idx] = number;
            }
        }
    });
}

#[ic_cdk::query]
fn get_user_portrait_at_index(index: i32) -> i32 {
    USER_PORTRAIT.with(|user_portrait| {
        let user_portrait_borrow = user_portrait.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(portrait) = user_portrait_borrow.get(idx) {
                return *portrait;
            }
        }
        0 // Return 0 if index is out of bounds
    })
}
#[ic_cdk::update]
fn update_user_gold(index: i32, new_gold: i32) {
    GOLD_POUCHES.with(|gold_pouches| {
        let mut gold_pouches_borrow = gold_pouches.borrow_mut();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if idx < gold_pouches_borrow.len() {
                gold_pouches_borrow[idx] = new_gold;
            }
        }
    });
}

#[ic_cdk::update]
fn update_user_power(index: i32, new_power: i32) {
    USER_POWERS.with(|user_powers| {
        let mut user_powers_borrow = user_powers.borrow_mut();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if idx < user_powers_borrow.len() {
                user_powers_borrow[idx] = new_power;
            }
        }
    });
}

#[ic_cdk::query]
fn get_user_cave_floor_at_index(index: i32) -> i32 {
    USER_CAVE_FLOOR.with(|user_cave_floor| {
        let user_cave_floor_borrow = user_cave_floor.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(cave_floor) = user_cave_floor_borrow.get(idx) {
                return *cave_floor;
            }
        }
        0 // Return 0 if index is out of bounds
    })
}

#[ic_cdk::update]
fn update_user_cave_floor(index: i32, new_floor: i32) {
    USER_CAVE_FLOOR.with(|user_cave_floor| {
        let mut user_cave_floor_borrow = user_cave_floor.borrow_mut();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if idx < user_cave_floor_borrow.len() {
                user_cave_floor_borrow[idx] = new_floor;
            }
        }
    });
}

#[ic_cdk::query]
fn get_user_forest_floor_at_index(index: i32) -> i32 {
    USER_FOREST_FLOOR.with(|user_forest_floor| {
        let user_forest_floor_borrow = user_forest_floor.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(forest_floor) = user_forest_floor_borrow.get(idx) {
                return *forest_floor;
            }
        }
        0 // Return 0 if index is out of bounds
    })
}

#[ic_cdk::update]
fn update_user_forest_floor(index: i32, new_floor: i32) {
    USER_FOREST_FLOOR.with(|user_forest_floor| {
        let mut user_forest_floor_borrow = user_forest_floor.borrow_mut();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if idx < user_forest_floor_borrow.len() {
                user_forest_floor_borrow[idx] = new_floor;
            }
        }
    });
}
#[ic_cdk::query]
fn get_user_experience_at_index(index: i32) -> i32 {
    USER_EXPERIENCE.with(|user_experience| {
        let user_experience_borrow = user_experience.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(experience) = user_experience_borrow.get(idx) {
                return *experience;
            }
        }
        0 // Return 0 if index is out of bounds
    })
}

#[ic_cdk::update]
fn update_user_experience(index: i32, new_experience: i32) {
    USER_EXPERIENCE.with(|user_experience| {
        let mut user_experience_borrow = user_experience.borrow_mut();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if idx < user_experience_borrow.len() {
                user_experience_borrow[idx] = new_experience;
            }
        }
    });
}

#[ic_cdk::query]
fn get_user_health_at_index(index: i32) -> i32 {
    USER_HEALTH.with(|user_health| {
        let user_health_borrow = user_health.borrow();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if let Some(health) = user_health_borrow.get(idx) {
                return *health;
            }
        }
        0 // Return 0 if index is out of bounds
    })
}

#[ic_cdk::update]
fn update_user_health(index: i32, new_health: i32) {
    USER_HEALTH.with(|user_health| {
        let mut user_health_borrow = user_health.borrow_mut();
        if let Some(idx) = index.checked_abs().and_then(|i| Some(i as usize)) {
            if idx < user_health_borrow.len() {
                user_health_borrow[idx] = new_health;
            }
        }
    });
}