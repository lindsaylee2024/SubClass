fn bubble_sort<T: Ord>(arr: &mut [T]) {
    for i in 0..arr.len() {
        for j in 0..arr.len() - 1 - i {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
            }
        }
    }
}

#[derive(Debug)]
struct Person {
    _name: String,
    age: usize,
}

impl PartialEq for Person {
    fn eq(&self, other: &Self) -> bool {
        self.age == other.age
    }
}

impl PartialOrd for Person {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        self.age.partial_cmp(&other.age)
    }
}

impl Eq for Person {}

impl Ord for Person {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.age.cmp(&other.age)
    }
}

fn main() {
    let mut ve1 = vec![7, 9, 12, 4, 11, -8, 92, -2, 34];
    println!("排序前: {:?}", ve1);
    bubble_sort(&mut ve1);
    println!("排序后：{:?}", ve1);

    let p1 = Person {
        _name: String::from("js"),
        age: 18,
    };

    let p2 = Person {
        _name: String::from("neo"),
        age: 2,
    };

    let p3 = Person {
        _name: String::from("yy"),
        age: 7,
    };

    let mut ve2 = vec![p1, p2, p3];
    println!("排序前: {:?}", ve2);
    bubble_sort(&mut ve2);
    println!("排序后：{:?}", ve2);
}
