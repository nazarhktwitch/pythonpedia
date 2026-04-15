---
layout: layouts/base.njk
title: "unittest Module — Unit Testing"
description: "Python unittest: unit testing framework, test cases, assertions, mocking"
---

# unittest — Unit Testing Framework

The `unittest` module provides a rich set of tools for constructing and running tests. It is inspired by JUnit.

```python
import unittest
```

## Basic Test Case

```python
import unittest

def add(a, b):
    return a + b

class TestMathOperations(unittest.TestCase):
    
    # Run before EACH test method
    def setUp(self):
        self.a = 10
        self.b = 5
        
    # Run after EACH test method
    def tearDown(self):
        pass

    # Test methods MUST start with 'test_'
    def test_add(self):
        result = add(self.a, self.b)
        self.assertEqual(result, 15)
        
    def test_add_negative(self):
        self.assertEqual(add(-1, -1), -2)

if __name__ == '__main__':
    unittest.main()
```

## Common Assertions

```python
self.assertEqual(a, b)          # a == b
self.assertNotEqual(a, b)       # a != b
self.assertTrue(x)              # bool(x) is True
self.assertFalse(x)             # bool(x) is False
self.assertIs(a, b)             # a is b
self.assertIsNone(x)            # x is None
self.assertIn(a, b)             # a in b
self.assertIsInstance(a, b)     # isinstance(a, b)
```

## Testing Exceptions

```python
import unittest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

class TestDivide(unittest.TestCase):
    def test_divide_by_zero(self):
        # Context manager style (preferred)
        with self.assertRaises(ValueError):
            divide(10, 0)
            
        # Or checking exception message
        with self.assertRaisesRegex(ValueError, "Cannot divide"):
            divide(10, 0)
```

## Skipping Tests

```python
import unittest
import sys

class TestFeatures(unittest.TestCase):
    @unittest.skip("Work in progress")
    def test_new_feature(self):
        pass

    @unittest.skipIf(sys.platform.startswith("win"), "Does not run on Windows")
    def test_linux_feature(self):
        pass
        
    @unittest.expectedFailure
    def test_broken_function(self):
        self.assertEqual(1, 0)
```

## Mocking (unittest.mock)

```python
from unittest.mock import MagicMock, patch
import unittest

# Module to test
import requests

def get_user_name(user_id):
    response = requests.get(f"https://api.example.com/users/{user_id}")
    return response.json()['name']

class TestAPI(unittest.TestCase):
    
    @patch('requests.get')
    def test_get_user_name(self, mock_get):
        # Configure the mock
        mock_response = MagicMock()
        mock_response.json.return_value = {'name': 'Alice'}
        mock_get.return_value = mock_response
        
        # Call the function
        name = get_user_name(1)
        
        # Assertions
        self.assertEqual(name, 'Alice')
        mock_get.assert_called_once_with("https://api.example.com/users/1")
```

## Running Tests

From the command line:

```bash
# Run all tests in a module
python -m unittest test_module.py

# Run a specific test class
python -m unittest test_module.TestClass

# Run a specific test method
python -m unittest test_module.TestClass.test_method

# Discover and run all tests in current directory
python -m unittest discover
```

## Official Documentation

[unittest — Unit testing framework](https://docs.python.org/3/library/unittest.html)


## API Reference

### Core Classes and Methods
| Class/Method | Description |
|--------------|-------------|
| `unittest.TestCase` | A class whose instances are single test cases. |
| `TestCase.setUp()` | Method called to prepare the test fixture. Called immediately before calling the test method. |
| `TestCase.tearDown()`| Method called immediately after the test method has been called and the result recorded. |
| `TestCase.assertEqual(a, b)`| Check that `a == b`. |
| `TestCase.assertTrue(x)` | Check that `bool(x) is True`. |
| `TestCase.assertRaises(exc, callable, *args)`| Test that an exception is raised when callable is called with arguments. |

### Mocking
| Object | Description |
|--------|-------------|
| `unittest.mock.MagicMock` | MagicMock is a subclass of Mock with default implementations of most of the magic methods. |
| `@unittest.mock.patch(target)`| A function decorator to mock a target object during a test. |
